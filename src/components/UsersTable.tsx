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
  useMediaQuery,
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

// Mobile card view for each user
const MobileUserCard = ({
  emp,
  onToggleActive,
}: {
  emp: (typeof users)[0];
  onToggleActive: (id: number, isActive: boolean) => void;
}) => (
  <div className="p-4 border rounded-lg mb-4 bg-white shadow-sm">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-medium">
        {emp.firstName} {emp.lastName}
      </h3>
      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
        {emp.employeeCode}
      </span>
    </div>
    <div className="text-sm text-gray-600 mb-1">
      <span className="font-medium">Email:</span> {emp.emailId}
    </div>
    <div className="text-sm text-gray-600 mb-1">
      <span className="font-medium">Client:</span> {emp.clientName}
    </div>
    <div className="text-sm text-gray-600 mb-1">
      <span className="font-medium">Role:</span> {emp.role}
    </div>
    <div className="flex justify-between items-center mt-3">
      <span className="text-sm font-medium">Active</span>
      <Switch
        checked={emp.isActive}
        color="primary"
        onChange={() => onToggleActive(emp.id, !emp.isActive)}
        size="small"
      />
    </div>
  </div>
);

const UsersTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<(typeof users)[0][]>(users);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

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

  const handleToggleActive = (id: number, isActive: boolean) => {
    setData((prev) =>
      prev.map((user) => (user.id === id ? { ...user, isActive } : user))
    );
  };

  const handleToggleSelect = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-screen-xl px-4 mx-auto">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between my-5">
        <h2 className="text-2xl font-semibold tracking-tight mb-3 sm:mb-0">
          Users Table
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="contained"
            onClick={() => setIsOpen(true)}
            size={isMobile ? "small" : "medium"}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            disabled={selectedUsers.length === 0}
          >
            Update
          </Button>
          <Button
            color="error"
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            disabled={selectedUsers.length === 0}
          >
            Remove
          </Button>
        </div>
      </div>

      {isMobile ? (
        <div className="space-y-4">
          {data.map((emp) => (
            <MobileUserCard
              key={emp.id}
              emp={emp}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            margin: "auto",
            overflowX: "auto",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="p-4 overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell padding="checkbox">
                    <input
                      type="checkbox"
                      onChange={() => {
                        if (selectedUsers.length === data.length) {
                          setSelectedUsers([]);
                        } else {
                          setSelectedUsers(data.map((u) => u.id));
                        }
                      }}
                      checked={
                        selectedUsers.length === data.length && data.length > 0
                      }
                    />
                  </TableCell>
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
                  <TableRow
                    key={emp.id}
                    sx={{
                      backgroundColor: selectedUsers.includes(emp.id)
                        ? "rgba(25, 118, 210, 0.08)"
                        : "inherit",
                    }}
                  >
                    <TableCell padding="checkbox">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(emp.id)}
                        onChange={() => handleToggleSelect(emp.id)}
                      />
                    </TableCell>
                    <TableCell>{emp.id}</TableCell>
                    <TableCell>{emp.employeeCode}</TableCell>
                    <TableCell>{emp.firstName}</TableCell>
                    <TableCell>{emp.lastName}</TableCell>
                    <TableCell>{emp.emailId}</TableCell>
                    <TableCell>{emp.clientName}</TableCell>
                    <TableCell>{emp.role}</TableCell>
                    <TableCell>
                      <Switch
                        checked={emp.isActive}
                        color="primary"
                        onChange={() =>
                          handleToggleActive(emp.id, !emp.isActive)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      )}

      <AnimatedSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAnimationComplete={focusFirstInput}
      >
        <AddUser
          onSubmit={onSubmit}
          firstInputRef={firstInputRef}
          isOpen={isOpen}
        />
      </AnimatedSheet>
    </div>
  );
};

export default UsersTable;
