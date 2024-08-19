import React from "react";
import "./App.css";
import DBdata from "./db.json";
import WidgetDrawer from "./Drawer";

function App() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(DBdata || []);
  const [id, setId] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");

  const toggleDrawer =
    (newOpen, ID = null) =>
    () => {
      setOpen(newOpen);
      if (ID) setId(ID);
    };

  const handleDrawerConfirm = (category) => {
    console.log("category",category)
    const temp = data.map((item) => {
      if (item.id === category.id) {
        return category;
      } else {
        return item;
      }
    });
    setData(temp);
    setOpen(false);
  };

  const handleDrawerCancel = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const JSONData = DBdata.map((el) => {
      el.widgets = el.widgets.map((widget) => {
        widget["visible"] = true;
        return widget;
      });
      return el;
    });
    setData(JSONData);
  }, [DBdata]);

  return (
    <div className="App">
      <div>
        <div style={{width:"90%",margin:"auto",display:"flex",justifyContent:"space-between",backgroundColor:"#fafcfb",alignItems:"center"}}>
          <h1>CNAPP dashboard</h1>
          <div style={{width:"50%",padding:"10px 20px"}}>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Widgets..."
              style={{ margin: "10px 0", padding: "10px 20px", width: "100%",borderRadius:"5px",border: "1px solid #007bff" }}
            />
          </div>
          <WidgetDrawer
            open={open}
            toggleDrawer={toggleDrawer}
            data={data}
            id={id}
            handleDrawerConfirm={handleDrawerConfirm}
            handleDrawerCancel={handleDrawerCancel}
            setOpen={setOpen}
          />
        </div>
        <div
          style={{
            width: "90%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            border: "0px solid black",
            backgroundColor: "#fafcfb",
            padding:"10px"
          }}
        >
          {data &&
            data.length &&
            data.map((el) => {
              return (
                <div key={el.id}>
                  <div
                    style={{
                      padding: "20px",
                      textAlign: "left",
                      fontFamily: "sans-serif",
                      fontSize: "24px",
                      fontWeight: "600",
                    }}
                  >
                    <p>{el.dashboard_category_name}</p>
                  </div>

                  <div
                    style={{
                      width: "98%",
                      margin: "auto",
                      display: "flex",
                      gap: "10px",
                      justifyContent: "space-between",
                      border: "0px solid yellow",
                    }}
                  >
                    {el.widgets &&
                      el.widgets.length &&
                      el.widgets
                        .filter((widget) =>
                          widget.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .map((widget) => {
                          return (
                            widget.visible === true && (
                              <div
                                key={widget.widget_id}
                                style={{
                                  width: "80%",
                                  height: "200px",
                                  border: "0px solid red",
                                  borderRadius: "20px",
                                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                  backgroundColor:"white"
                                }}
                              >
                                <div
                                  style={{
                                    padding: "0px 10px",
                                    textAlign: "left",
                                  }}
                                >
                                  <h3>{widget.name}</h3>
                                </div>
                                <div
                                  style={{
                                    padding: "20px",
                                    textAlign: "center",
                                  }}
                                >
                                  <p>{widget.text}</p>
                                </div>
                              </div>
                            )
                          );
                        })}
                    <div
                      key={el.widgets && el.widgets.length + 1}
                      style={{
                        width: "100%",
                        height: "200px",
                        border: "0px solid red",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                        backgroundColor:"white"
                      }}
                    >
                      <button
                        style={{
                          textAlign: "center",
                          padding: "0px 24px",
                          borderRadius: "20px",
                          border: "0px solid gray",
                        }}
                        onClick={toggleDrawer(true, el.id)}
                      >
                        <p>+ Add Widget</p>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
