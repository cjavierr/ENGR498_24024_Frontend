import { useState } from "react";
import Spreadsheet from "react-spreadsheet";
import { Button} from "antd";

const Dashboard: React.FC = () => {
  const [data1, setData1] = useState([
    [{ value: "Vanilla" }, { value: "Chocolate" }, { value: "" }],
    [{ value: "Strawberry" }, { value: "Cookies" }, { value: "" }],
  ]);
  const columnLabels = [""]
  const saveData = () => {
    console.log(data1);
    // Here you can add code to save data1 to a server
  };

  return (
    <div>
      <Spreadsheet data={data1} onChange={setData1 as any} />
        <br />
      <Button type="primary" onClick={saveData}>Save</Button>
    </div>
  );
};

export default Dashboard;