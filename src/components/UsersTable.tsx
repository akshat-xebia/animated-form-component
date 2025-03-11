import {
  Button,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRef, useState } from "react";
import AnimatedSheet from "./AnimatedSheet";
import AddUser from "./AddUserForm";

// Dummy Employee Data
const users = [
  {
    id: 1,
    employeeCode: "EMP001",
    firstName: "John",
    lastName: "Doe",
    emailId: "john.doe@example.com",
    clientName: "Google",
    role: "Software Engineer",
    isActive: true,
  },
  {
    id: 2,
    employeeCode: "EMP002",
    firstName: "Alice",
    lastName: "Smith",
    emailId: "alice.smith@example.com",
    clientName: "Amazon",
    role: "Data Analyst",
    isActive: false,
  },
  {
    id: 3,
    employeeCode: "EMP003",
    firstName: "Michael",
    lastName: "Brown",
    emailId: "michael.brown@example.com",
    clientName: "Microsoft",
    role: "Project Manager",
    isActive: true,
  },
  {
    id: 4,
    employeeCode: "EMP004",
    firstName: "Emily",
    lastName: "Clark",
    emailId: "emily.clark@example.com",
    clientName: "Facebook",
    role: "UI/UX Designer",
    isActive: true,
  },
  {
    id: 5,
    employeeCode: "EMP005",
    firstName: "David",
    lastName: "Wilson",
    emailId: "david.wilson@example.com",
    clientName: "Tesla",
    role: "DevOps Engineer",
    isActive: false,
  },
];

interface UserFormData {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  emailId: string;
  clientName: string;
  role: string;
  isActive: boolean;
}

const UsersTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<(typeof users)[0][]>(users);

  const onSubmit = (formData: UserFormData) => {
    console.log("Submitted", formData);

    const newUser = {
      ...formData,
      id: data.length + 1,
    };

    setData((prev) => [...prev, newUser]);
    setIsOpen(false);
  };

  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const focusFirstInput = () => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  };

  return (
    <div className="max-w-screen-xl">
      <TableContainer component={Paper} sx={{ margin: "auto", mt: 5, p: 3 }}>
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight mb-7">
            Users Table
          </h2>
          <div>
            <Button onClick={() => setIsOpen(true)}>Add</Button>
            <Button>Update</Button>
            <Button>Remove</Button>
          </div>
        </div>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <b>ID</b>
              </TableCell>
              <TableCell>
                <b>Employee Code</b>
              </TableCell>
              <TableCell>
                <b>First Name</b>
              </TableCell>
              <TableCell>
                <b>Last Name</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Client Name</b>
              </TableCell>
              <TableCell>
                <b>Role</b>
              </TableCell>
              <TableCell>
                <b>Active</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.id}</TableCell>
                <TableCell>{emp.employeeCode}</TableCell>
                <TableCell>{emp.firstName}</TableCell>
                <TableCell>{emp.lastName}</TableCell>
                <TableCell>{emp.emailId}</TableCell>
                <TableCell>{emp.clientName}</TableCell>
                <TableCell>{emp.role}</TableCell>
                <TableCell>
                  <Switch checked={emp.isActive} color="primary" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AnimatedSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAnimationComplete={focusFirstInput}
      >
        <AddUser onSubmit={onSubmit} firstInputRef={firstInputRef} />
      </AnimatedSheet>
    </div>
  );
};

export default UsersTable;
