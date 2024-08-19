import React, { useState, useEffect } from "react";
import { Box, Button, TextField, IconButton, Drawer, Tab, Tabs } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Close } from "@mui/icons-material";

export default function WidgetDrawer({open,toggleDrawer,data,id,handleDrawerConfirm,handleDrawerCancel}) {
  const [value, setValue] = useState(id);
  const [drawerData, setDrawerData] = useState(data);
  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetText, setNewWidgetText] = useState("");

  useEffect(() => {
    setValue(id);
    setDrawerData(data);
  }, [id, data]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCheckBoxChange = (e, category_id, widget_id) => {
    const updatedData = drawerData.map((category) => {
      if (category.id === category_id) {
        category.widgets = category.widgets.map((widget) => {
          if (widget.widget_id === widget_id) {
            widget.visible = e.target.checked;
          }
          return widget;
        });
      }
      return category;
    });
    setDrawerData(updatedData);
  };

  const handleAddWidget = () => {
    if (newWidgetName && newWidgetText) {
      const updatedData = drawerData.map((category) => {
        if (category.id === value) {
          const newWidget = {
            widget_id: Math.random().toString(36).substr(2, 9), 
            name: newWidgetName,
            text: newWidgetText,
            visible: true,
          };
          category.widgets.push(newWidget);
        }
        return category;
      });
      setDrawerData(updatedData);
      setNewWidgetName("");
      setNewWidgetText("");
    }
  };

  const handleRemoveWidget = (category_id, widget_id) => {
    const updatedData = drawerData.map((category) => {
      if (category.id === category_id) {
        category.widgets = category.widgets.filter((widget) => widget.widget_id !== widget_id);
      }
      return category;
    });
    setDrawerData(updatedData);
  };

  const handleConfirm = () => {
    const confirmedData = drawerData.find((category) => category.id === id);
    if (confirmedData) {
      handleDrawerConfirm(confirmedData);
    }
    toggleDrawer(false)();
  };

  const handleCancel = () => {
    setDrawerData(data); 
    handleDrawerCancel();
    toggleDrawer(false)();
  };

  const DrawerList = (
    <Box sx={{ width: "900px" }} role="presentation">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value.toString()}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="Dashboard Tabs">
              {drawerData.map((category) => (
                <Tab label={category.dashboard_category_name} value={category.id.toString()} key={category.id} />
              ))}
            </TabList>
          </Box>
          {drawerData.map((category) => (
            <TabPanel value={category.id.toString()} key={category.id}>
            <Box 
              sx={{
                display: "flex",
                flexWrap: "wrap", 
                gap: "10px",
                justifyContent: "flex-start", 
                maxHeight: "400px", 
                overflowX: "auto" 
              }}
            >
              {category.widgets.map((widget) => (
                <Box 
                  key={widget.widget_id} 
                  sx={{
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    width: "calc(50% - 10px)", 
                    padding: "10px", 
                    backgroundColor: "#f9f9f9", 
                    borderRadius: "5px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={widget.visible}
                      onChange={(e) => handleCheckBoxChange(e, category.id, widget.widget_id)}
                    />
                    <label>{widget.name}</label>
                  </div>
                  <IconButton onClick={() => handleRemoveWidget(category.id, widget.widget_id)}>
                    <Close />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Widget Name"
                value={newWidgetName}
                onChange={(e) => setNewWidgetName(e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Widget Text"
                value={newWidgetText}
                onChange={(e) => setNewWidgetText(e.target.value)}
                fullWidth
                margin="dense"
              />
              <Button variant="contained" onClick={handleAddWidget} sx={{ mt: 2 }}>
                Add Widget
              </Button>
            </Box>
          </TabPanel>
          
          ))}
        </TabContext>
      </Box>
      <Button onClick={handleConfirm} variant="contained" color="primary" sx={{ mt: 2 }}>
        Confirm
      </Button>
      <Button onClick={handleCancel} variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }}>
        Cancel
      </Button>
    </Box>
  );

  return (
    <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
      {DrawerList}
    </Drawer>
  );
}
