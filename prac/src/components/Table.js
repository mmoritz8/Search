import React from "react";
import MaterialTable from "material-table";
import employeeList from "../employee.json";

const employeeArray = [];
for (var i = 0; i < employeeList.length; i++) {
  employeeArray.push(employeeList[i]);
}

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Position", field: "position" },
      { title: "Phone", field: "phone" },
      { title: "Team", field: "team" },
      { title: "Birthday", field: "birthday" },
      { title: "Email", field: "email" }
    ],

    data: employeeArray
  });

  return (
    <MaterialTable
      title="Employee Contacts"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
}
