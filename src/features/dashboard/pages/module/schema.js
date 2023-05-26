export const SUNBRUST_DATA = [{
  name: "root",
  fill: "white",
  showValue: '100',
  children: [
    {
      name: "CY1",
      fill: "success",
      showValue: '20',
      children: [
        {
          value: 5,
          name: "CY3",
          fill: "success",
          showValue: '20',
        },
      ]
    },
    {
      name: "CY2",
      fill: "error",
      showValue: '20',
      children: [
        {
          name: "CY4",
          value: 5,
          fill: "error",
          showValue: '20',
        },
      ]
    },
    {
      name: "CY5",
      fill: "warning",
      showValue: '20',
      children: [
        {
          name: "CY6",
          fill: "warning",
          showValue: '20',
          value: 5
        }
      ]
    }
  ]
}];


// [
//   {
//     name: "Total",
//     value: 100, // Center 
//     fill: "white",
//     children: [
//       {
//         name: "CY1",
//         fill: "#63c6c1",
//         value: 25, // First Circle
//         children: [
//           {
//             name: "CY3",
//             value: 150,
//             fill: "#63c6c1",// Second Circle
//           },
//         ],
//       },
//       {
//         name: "CY2",
//         fill: "#63c6c1",
//         value: 25, // First Circle
//         currentValue: "20",
//         children: [
//           {
//             name: "CY5",
//             value: 25,
//             fill: "#63c6c1",// Second Circle
//           },
//         ],
//       },
//       {
//         name: "CY3",
//         fill: "#63c6c1",
//         value: 25, // First Circle
//         currentValue: "20",
//         children: [
//           {
//             name: "CY6",
//             value: 25,
//             fill: "#63c6c1",// Second Circle
//           },
//         ],
//       },
//       {
//         name: "CY4",
//         fill: "#63c6c1",
//         value: 25, // First Circle
//         currentValue: "20",
//         children: [
//           {
//             name: "CY7",
//             value: 25,
//             fill: "#63c6c1",// Second Circle
//           },
//         ],
//       },
//     ]
//   }
// ]
