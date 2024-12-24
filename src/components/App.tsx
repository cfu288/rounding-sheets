import { Route, Routes } from "react-router";

import { Home } from "@/pages/Home";
import { ShowPDF } from "@/pages/ShowPDF";
import BPLogApp from "./BPTable/BPLogApp";

// const usePatientList = () => {
//   const [patientList, setPatientList] = useState<Patient[]>(() => {
//     return patient_list.sort((a, b) => {
//       if (!a?.location) return 1;
//       if (!b?.location) return -1;
//       return a.location.localeCompare(b.location);
//     });
//   });

//   useEffect(() => {
//     localStorage.setItem("patientList", JSON.stringify(patientList));
//   }, [patientList]);

//   return [patientList, setPatientList] as const;
// };

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="scutsheet">
        <Route path=":templateId" element={<ShowPDF />} />
      </Route>
      <Route path="tool">
        <Route path="blood-pressure-log" element={<BPLogApp />} />
      </Route>
    </Routes>
  );
};

// const App2 = () => {
//   const [patientList, setPatientList] = usePatientList();
//   const [newPatient, setNewPatient] = useState<Patient>({});
//   const [showPDF, setShowPDF] = useState(false);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [newPatientModalIsOpen, setNewPatientModalIsOpen] = useState(false);
//   const [currentPatientIndex, setCurrentPatientIndex] = useState<number | null>(
//     null
//   );
//   const [currentSection, setCurrentSection] = useState<
//     "todos" | "assessment_and_plan" | null
//   >(null);

//   const addPatient = () => {
//     setPatientList([...patientList, newPatient]);
//     setNewPatient({});
//     handleCloseNewPatientModal();
//   };

//   const removePatient = (index: number) => {
//     setPatientList(patientList.filter((_, i) => i !== index));
//   };

//   const updatePatient = (index: number, updatedPatient: Patient) => {
//     setPatientList(
//       patientList.map((patient, i) => (i === index ? updatedPatient : patient))
//     );
//   };

//   const handleOpenModal = (
//     index: number,
//     section: "todos" | "assessment_and_plan"
//   ) => {
//     setCurrentPatientIndex(index);
//     setCurrentSection(section);
//     setModalIsOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalIsOpen(false);
//     setCurrentPatientIndex(null);
//     setCurrentSection(null);
//   };

//   const handleOpenNewPatientModal = () => {
//     setNewPatientModalIsOpen(true);
//   };

//   const handleCloseNewPatientModal = () => {
//     setNewPatientModalIsOpen(false);
//   };

//   const columns: ColumnDef<Patient>[] = [
//     {
//       id: "patient_info",
//       header: "Patient Info",
//       cell: ({ row }) => (
//         <div className="flex flex-col">
//           <EditableField
//             value={row.original.first_name || ""}
//             onChange={(value) =>
//               updatePatient(row.index, {
//                 ...row.original,
//                 first_name: value,
//               })
//             }
//             elementType="div"
//             className="border h-full w-full mb-1"
//           />
//           <EditableField
//             value={row.original.last_name || ""}
//             onChange={(value) =>
//               updatePatient(row.index, {
//                 ...row.original,
//                 last_name: value,
//               })
//             }
//             elementType="div"
//             className="border h-full w-full mb-1"
//           />
//           <EditableField
//             value={row.original.dob || ""}
//             onChange={(value) =>
//               updatePatient(row.index, {
//                 ...row.original,
//                 dob: value,
//               })
//             }
//             elementType="div"
//             className="border h-full w-full mb-1"
//           />
//           <EditableField
//             value={row.original.mrn || ""}
//             onChange={(value) =>
//               updatePatient(row.index, {
//                 ...row.original,
//                 mrn: value,
//               })
//             }
//             elementType="div"
//             className="border h-full w-full mb-1"
//           />
//           <EditableField
//             value={row.original.location || ""}
//             onChange={(value) =>
//               updatePatient(row.index, {
//                 ...row.original,
//                 location: value,
//               })
//             }
//             elementType="div"
//             className="border h-full w-full"
//           />
//         </div>
//       ),
//     },
//     {
//       accessorKey: "one_liner",
//       header: "One Liner",
//       cell: ({ row, getValue }) => (
//         <EditableField
//           value={getValue() || ""}
//           onChange={(value) =>
//             updatePatient(row.index, {
//               ...row.original,
//               one_liner: value,
//             })
//           }
//           elementType="div"
//           className="border h-full w-full"
//         />
//       ),
//     },
//     {
//       id: "todos",
//       header: "Todos",
//       cell: ({ row }) => (
//         <div className="flex flex-col items-center">
//           <div className="truncate max-w-24">
//             {row.original.todos?.map((todo, index) => (
//               <span key={index} className="mr-1">
//                 {todo.description}
//                 {index < row.original.todos.length - 1 && ", "}
//               </span>
//             ))}
//           </div>
//           <button
//             onClick={() => handleOpenModal(row.index, "todos")}
//             className="bg-blue-500 text-white p-1 ml-2"
//           >
//             Edit
//           </button>
//         </div>
//       ),
//     },
//     {
//       id: "assessment_and_plan",
//       header: "Assessment & Plan",
//       cell: ({ row }) => (
//         <div className="flex flex-col items-center">
//           <ol className="truncate max-w-24 list-decimal">
//             {row.original.assessment_and_plan?.map((item, index) => (
//               <li key={index} className="mr-1">
//                 {item.assessment}
//               </li>
//             ))}
//           </ol>
//           <button
//             onClick={() => handleOpenModal(row.index, "assessment_and_plan")}
//             className="bg-blue-500 text-white p-1 ml-2"
//           >
//             Edit
//           </button>
//         </div>
//       ),
//     },
//     {
//       id: "actions",
//       header: "Actions",
//       cell: ({ row }) => (
//         <button
//           onClick={() => removePatient(row.index)}
//           className="bg-red-500 text-white p-1"
//         >
//           Remove
//         </button>
//       ),
//     },
//   ];

//   const table = useReactTable({
//     data: patientList,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   const [instance, update] = usePDF({
//     document: <PatientListPrintout patients={patientList} />,
//   });

//   return (
//     <div className="w-full h-screen min-h-full">
//       <iframe
//         src={instance.url}
//         style={{
//           width: "100%",
//           height: "100%",
//           margin: 0,
//           border: "none",
//         }}
//       />
//     </div>
//   );

//   // return (
//   //   <div className="flex flex-col h-screen text-xs overflow-x-auto">
//   //     <div className="flex flex-col w-full">
//   //       <div className="items-center justify-center w-full bg-emerald-800 text-white">
//   //         <h1 className="text-2xl font-bold min-w-64">Patient List</h1>
//   //         <button
//   //           onClick={() => {
//   //             setShowPDF((x) => !x);
//   //             update(<PatientListPrintout patients={patientList} />);
//   //           }}
//   //         >
//   //           show
//   //         </button>
//   //         <button
//   //           onClick={handleOpenNewPatientModal}
//   //           className="bg-blue-500 text-white p-2 ml-2"
//   //         >
//   //           New Patient
//   //         </button>
//   //       </div>
//   //       <Modal
//   //         isOpen={newPatientModalIsOpen}
//   //         onClose={handleCloseNewPatientModal}
//   //       >
//   //         <form
//   //           onSubmit={(e) => {
//   //             e.preventDefault();
//   //             addPatient();
//   //           }}
//   //           className="mt-4"
//   //         >
//   //           <p>New patient</p>
//   //           <EditableField
//   //             value={newPatient.first_name || ""}
//   //             onChange={(value) =>
//   //               setNewPatient({ ...newPatient, first_name: value })
//   //             }
//   //             className="border p-2 mb-2 w-full"
//   //             elementType="div"
//   //           />
//   //           <EditableField
//   //             value={newPatient.last_name || ""}
//   //             onChange={(value) =>
//   //               setNewPatient({ ...newPatient, last_name: value })
//   //             }
//   //             className="border p-2 mb-2 w-full"
//   //             elementType="div"
//   //           />
//   //           <EditableField
//   //             value={newPatient.dob || ""}
//   //             onChange={(value) => setNewPatient({ ...newPatient, dob: value })}
//   //             className="border p-2 mb-2 w-full"
//   //             elementType="div"
//   //           />
//   //           <EditableField
//   //             value={newPatient.mrn || ""}
//   //             onChange={(value) => setNewPatient({ ...newPatient, mrn: value })}
//   //             className="border p-2 mb-2 w-full"
//   //             elementType="div"
//   //           />
//   //           <EditableField
//   //             value={newPatient.location || ""}
//   //             onChange={(value) =>
//   //               setNewPatient({ ...newPatient, location: value })
//   //             }
//   //             className="border p-2 mb-2 w-full"
//   //             elementType="div"
//   //           />
//   //           <EditableField
//   //             value={newPatient.one_liner || ""}
//   //             onChange={(value) =>
//   //               setNewPatient({ ...newPatient, one_liner: value })
//   //             }
//   //             className="border p-2 mb-2 w-full"
//   //             elementType="div"
//   //           />
//   //           <button
//   //             type="submit"
//   //             className="bg-emerald-800 text-white p-2 w-full"
//   //           >
//   //             Add Patient
//   //           </button>
//   //         </form>
//   //       </Modal>
//   //       <div className="mt-4 overflow-y-scroll">
//   //         <div className="overflow-x-auto">
//   //           <table className="min-w-full">
//   //             <thead>
//   //               {table.getHeaderGroups().map((headerGroup) => (
//   //                 <tr key={headerGroup.id}>
//   //                   {headerGroup.headers.map((header) => (
//   //                     <th
//   //                       key={header.id}
//   //                       className="border p-2 whitespace-nowrap relative"
//   //                       style={{ width: `${header.getSize()}px` }}
//   //                     >
//   //                       {flexRender(
//   //                         header.column.columnDef.header,
//   //                         header.getContext()
//   //                       )}
//   //                       <div
//   //                         onMouseDown={header.getResizeHandler()}
//   //                         onTouchStart={header.getResizeHandler()}
//   //                         className="resizer"
//   //                         style={{
//   //                           cursor: "col-resize",
//   //                           userSelect: "none",
//   //                           width: "10px",
//   //                           height: "100%",
//   //                           position: "absolute",
//   //                           right: 0,
//   //                           top: 0,
//   //                           backgroundColor: "red", // Make the resizer visible
//   //                           transform: header.column.getIsResizing()
//   //                             ? `translateX(${
//   //                                 table.getState().columnSizingInfo.deltaOffset
//   //                               }px)`
//   //                             : "",
//   //                         }}
//   //                       />
//   //                     </th>
//   //                   ))}
//   //                 </tr>
//   //               ))}
//   //             </thead>
//   //             <tbody>
//   //               {table.getRowModel().rows.map((row) => (
//   //                 <tr key={row.id}>
//   //                   {row.getVisibleCells().map((cell) => (
//   //                     <td
//   //                       key={cell.id}
//   //                       className="border p-2"
//   //                       style={{ width: `${cell.column.getSize()}px` }}
//   //                     >
//   //                       {flexRender(
//   //                         cell.column.columnDef.cell,
//   //                         cell.getContext()
//   //                       )}
//   //                     </td>
//   //                   ))}
//   //                 </tr>
//   //               ))}
//   //             </tbody>
//   //           </table>
//   //         </div>
//   //       </div>
//   //     </div>
//   //     {showPDF && (
//   //       <div className="w-full h-screen min-h-full">
//   //         <iframe
//   //           src={instance.url}
//   //           style={{
//   //             width: "100%",
//   //             height: "100%",
//   //             margin: 0,
//   //             border: "none",
//   //           }}
//   //         />
//   //       </div>
//   //     )}
//   //     <Modal isOpen={modalIsOpen} onClose={handleCloseModal}>
//   //       {currentPatientIndex !== null && currentSection === "todos" && (
//   //         <div>
//   //           <h2>Edit Todos</h2>
//   //           {patientList[currentPatientIndex].todos?.map((todo, todoIndex) => (
//   //             <div key={todoIndex} className="flex items-center mb-2">
//   //               <EditableField
//   //                 value={todo.description}
//   //                 onChange={(value) => {
//   //                   const updatedTodos = [
//   //                     ...(patientList[currentPatientIndex].todos || []),
//   //                   ];
//   //                   updatedTodos[todoIndex].description = value;
//   //                   updatePatient(currentPatientIndex, {
//   //                     ...patientList[currentPatientIndex],
//   //                     todos: updatedTodos,
//   //                   });
//   //                 }}
//   //                 className="border p-1 mr-2 flex-1"
//   //                 elementType="div"
//   //               />
//   //               <button
//   //                 onClick={() => {
//   //                   const updatedTodos = (
//   //                     patientList[currentPatientIndex].todos || []
//   //                   ).filter((_, i) => i !== todoIndex);
//   //                   updatePatient(currentPatientIndex, {
//   //                     ...patientList[currentPatientIndex],
//   //                     todos: updatedTodos,
//   //                   });
//   //                 }}
//   //                 className="bg-red-500 text-white p-1"
//   //               >
//   //                 Remove
//   //               </button>
//   //             </div>
//   //           ))}
//   //           <button
//   //             onClick={() => {
//   //               const updatedTodos = [
//   //                 ...(patientList[currentPatientIndex].todos || []),
//   //                 { description: "", status: "OPEN" },
//   //               ];
//   //               updatePatient(currentPatientIndex, {
//   //                 ...patientList[currentPatientIndex],
//   //                 todos: updatedTodos,
//   //               });
//   //             }}
//   //             className="bg-green-500 text-white p-1 mt-2"
//   //           >
//   //             Add Todo
//   //           </button>
//   //         </div>
//   //       )}
//   //       {currentPatientIndex !== null &&
//   //         currentSection === "assessment_and_plan" && (
//   //           <div>
//   //             <h2>Edit Assessment & Plan</h2>
//   //             {patientList[currentPatientIndex].assessment_and_plan?.map(
//   //               (ap, apIndex) => (
//   //                 <div key={apIndex} className="mb-4">
//   //                   <EditableField
//   //                     value={ap.assessment}
//   //                     onChange={(value) => {
//   //                       const updatedAP = [
//   //                         ...(patientList[currentPatientIndex]
//   //                           .assessment_and_plan || []),
//   //                       ];
//   //                       updatedAP[apIndex].assessment = value;
//   //                       updatePatient(currentPatientIndex, {
//   //                         ...patientList[currentPatientIndex],
//   //                         assessment_and_plan: updatedAP,
//   //                       });
//   //                     }}
//   //                     className="border p-1 mb-2 w-full"
//   //                     elementType="div"
//   //                   />
//   //                   {ap.plan.map((planItem, planIndex) => (
//   //                     <div key={planIndex} className="flex items-center mb-2">
//   //                       <EditableField
//   //                         value={planItem}
//   //                         onChange={(value) => {
//   //                           const updatedAP = [
//   //                             ...(patientList[currentPatientIndex]
//   //                               .assessment_and_plan || []),
//   //                           ];
//   //                           updatedAP[apIndex].plan[planIndex] = value;
//   //                           updatePatient(currentPatientIndex, {
//   //                             ...patientList[currentPatientIndex],
//   //                             assessment_and_plan: updatedAP,
//   //                           });
//   //                         }}
//   //                         className="border p-1 mr-2 flex-1"
//   //                         elementType="div"
//   //                       />
//   //                       <button
//   //                         onClick={() => {
//   //                           const updatedAP = [
//   //                             ...(patientList[currentPatientIndex]
//   //                               .assessment_and_plan || []),
//   //                           ];
//   //                           updatedAP[apIndex].plan = updatedAP[
//   //                             apIndex
//   //                           ].plan.filter((_, i) => i !== planIndex);
//   //                           updatePatient(currentPatientIndex, {
//   //                             ...patientList[currentPatientIndex],
//   //                             assessment_and_plan: updatedAP,
//   //                           });
//   //                         }}
//   //                         className="bg-red-500 text-white p-1"
//   //                       >
//   //                         Remove
//   //                       </button>
//   //                     </div>
//   //                   ))}
//   //                   <button
//   //                     onClick={() => {
//   //                       const updatedAP = [
//   //                         ...(patientList[currentPatientIndex]
//   //                           .assessment_and_plan || []),
//   //                       ];
//   //                       updatedAP[apIndex].plan.push("");
//   //                       updatePatient(currentPatientIndex, {
//   //                         ...patientList[currentPatientIndex],
//   //                         assessment_and_plan: updatedAP,
//   //                       });
//   //                     }}
//   //                     className="bg-green-500 text-white p-1 mt-2"
//   //                   >
//   //                     Add Plan Item
//   //                   </button>
//   //                 </div>
//   //               )
//   //             )}
//   //             <button
//   //               onClick={() => {
//   //                 const updatedAP = [
//   //                   ...(patientList[currentPatientIndex].assessment_and_plan ||
//   //                     []),
//   //                   { assessment: "", plan: [""] },
//   //                 ];
//   //                 updatePatient(currentPatientIndex, {
//   //                   ...patientList[currentPatientIndex],
//   //                   assessment_and_plan: updatedAP,
//   //                 });
//   //               }}
//   //               className="bg-green-500 text-white p-1 mt-2"
//   //             >
//   //               Add Assessment & Plan
//   //             </button>
//   //           </div>
//   //         )}
//   //     </Modal>
//   //   </div>
//   // );
// };

export default App;
