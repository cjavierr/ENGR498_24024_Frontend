import { useState } from "react";
import Spreadsheet from "react-spreadsheet";
import { Button} from "antd";

const Dashboard: React.FC = () => {
  const [data1, setData1] = useState([
    [{ value: "48000" }, { value: "16000" }, { value: "32000" }, { value: "16000" }, { value: "64000" }, { value: "16000" }, { value: "48000" }],
    [{ value: "16000" }, { value: "32000" }, { value: "16000" }, { value: "32000" }, { value: "16000" }, { value: "32000" }, { value: "16000" }],
    [{ value: "48000" }, { value: "64000" }, { value: "32000" }, { value: "16000" }, { value: "16000" }, { value: "16000" }, { value: "48000" }],
    [{ value: "32000" }, { value: "48000" }, { value: "16000" }, { value: "16000" }, { value: "32000" }, { value: "32000" }, { value: "32000" }],
    [{ value: "48000" }, { value: "16000" }, { value: "32000" }, { value: "16000" }, { value: "32000" }, { value: "48000" }, { value: "48000" }],
  ]);
  const columnLabels = ["8/1/2023", "9/1/2023", "10/1/2023", "11/1/2023",
                        "12/1/2023", "1/1/2024", "2/1/2024"]

  const rowLabels = ["Shop Mechanics", "Instrument Techs", "Operators",
                      "Engineer - Type 1", "Engineer - Type 2"]

  const saveData = () => {
    console.log(data1);
    // Here you can add code to save data1 to a server
  };

  return (
    <div>
      <b>Category:</b> Roles
      <Spreadsheet data={data1} onChange={setData1 as any} columnLabels={columnLabels} rowLabels={rowLabels} />
        <br />
      <Button type="primary" onClick={saveData}>Save</Button>
    </div>
  );
};

export default Dashboard;