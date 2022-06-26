import React, { useState, useEffect } from "react";
import "antd/dist/antd.min.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CancelIcon from "@mui/icons-material/Cancel";
import "./Todo.css";
import { Button, Checkbox } from "antd";

const Todo = () => {
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState([]);
  const [toggleCheckbox, setToggleCheckbox] = useState(true);
  const [filterType, setFilterType] = useState("All");
  const buttonType = ["All", "Active", "Complete"];
  const [clearAll, setClearAll] = useState(false);

  useEffect(() => {
    console.log(itemList);
  }, [itemList]);

  const itemEvent = (e) => {
    setItem(e.target.value);
  };

  const listOfItem = () => {
    if (item !== "") {
      const itemDetails = {
        id: Math.floor(Math.random() * 1000),
        value: item,
        isCompleted: false,
      };
      setItemList([...itemList, itemDetails]);
    }

    setItem("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      listOfItem();
    }
  };

  const handleButton = (value) => {
    setFilterType(value);
  };

  const handleArrowClick = () => {
    const data = [...itemList];
    for (let i = 0; i < data.length; i++) {
      data[i] = {
        ...data[i],
        isCompleted: toggleCheckbox,
      };
    }
    setToggleCheckbox(!toggleCheckbox);
    setItemList(data);
  };

  const handleClear = () => {
    setItemList(itemList.filter((obj) => obj.isCompleted === false));
    setClearAll(false)
  };

  const deleteItem = (e, id) => {
    e.preventDefault();
    setItemList(itemList.filter((t) => t.id != id));
  };

  const itemCompleted = (e, id) => {
    e.preventDefault();
    const element = itemList.findIndex((elem) => elem.id === id);

    const newItemList = [...itemList];

    newItemList[element] = {
      ...newItemList[element],
      isCompleted: e.target.checked,
    };
    if(e.target.checked){
      iscomplitchec(true);
    }
    if(e.target.checked===false){
      iscomplitchec(false);
    }

    setItemList(newItemList);
  };
  const iscomplitchec=(e)=>{
        setClearAll(e);
  }

  return (
    <>
      <div className="main-div">
        <div className="center-div">
          <br />
          <h1 className="title">ToDos</h1>
          <br />
          <div className="main-data-box">
            <div className="input-box">
              <div className="icon">
                <KeyboardArrowDownIcon
                  fontSize="large"
                  onClick={handleArrowClick}
                />
              </div>
              <input
                type="text"
                size="55"
                value={item}
                placeholder="What need to be done ?"
                onChange={(e) => itemEvent(e)}
                onKeyDown={handleKeyDown}
                style={{ marginTop: "20px" }}
              />
              <div className="icon">
                <AddCircleOutlineIcon fontSize="large" onClick={listOfItem} />
              </div>
            </div>
            <br />
            {itemList.length > 0 ? (
              <div>
                <ul>
                  {itemList
                    .filter((obj) =>
                      filterType === "Active"
                        ? obj.isCompleted === false
                        : filterType === "Complete"
                        ? obj.isCompleted === true
                        : true
                    )
                    .map((t) => (
                      <li
                        key={t.id}
                        className={`${"listItem"} ${
                          t.isCompleted && "crossText"
                        }`}
                    
                      >
                        {/* {
                          t.isCompleted? { ()=>iscomplitchec(true)}:null
                        } */}
                        {console.log("clearall",clearAll)}
                        <Checkbox
                        style={{marginRight: '15px'}}
                          checked={t.isCompleted}
                          onChange={(e) => itemCompleted(e, t.id)}
                          onclick={ ()=>iscomplitchec(true)}
                        />
                        {t.value}
                        <CancelIcon
                          className="cancel"
                          onClick={(e) => deleteItem(e, t.id)}
                        />
                      </li>
                    ))}
                </ul>

                <div style={{ margin: "auto", width: "fit-content" }}>
                  {buttonType.map((value, index) => (
                    <Button
                      key={index}
                      type={value === filterType ? "primary" : "secondary"}
                      style={{ margin: "0 5px" }}
                      onClick={() => handleButton(value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
                <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                  {itemList.filter((obj) => obj.isCompleted === false).length}{" "}
                  item left
                  {
                    clearAll?
                    <span
                    style={{
                      float: "right",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                    onClick={handleClear}
                  >
                    clear completed
                  </span> :null
                  }
                  
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
