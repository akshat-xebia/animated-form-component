import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface AddUserProps {
  onSubmit: (formData: UserFormData) => void;
  firstInputRef: React.RefObject<HTMLInputElement | null>;
  isOpen: boolean;
}

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

const roles = [
  "Software Engineer",
  "Data Analyst",
  "Project Manager",
  "UI/UX Designer",
  "DevOps Engineer",
];

const AddUser: React.FC<AddUserProps> = ({
  onSubmit,
  firstInputRef,
  isOpen,
}) => {
  const isAdmin = true;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    id: "",
    employeeCode: "",
    firstName: "",
    lastName: "",
    emailId: "",
    clientName: "",
    role: "",
    isActive: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, isActive: e.target.checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      onSubmit(formData);

      setLoading(false);

      setFormData({
        id: "",
        employeeCode: "",
        firstName: "",
        lastName: "",
        emailId: "",
        clientName: "",
        role: "",
        isActive: false,
      });
    }, 2000);
  };

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        id: "",
        employeeCode: "",
        firstName: "",
        lastName: "",
        emailId: "",
        clientName: "",
        role: "",
        isActive: false,
      });
    }
  }, [isOpen]);

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-semibold text-xl">Add User</h2>
      <TextField
        fullWidth
        margin="normal"
        label="ID"
        name="id"
        value={formData.id}
        onChange={handleChange}
        required
        inputRef={firstInputRef}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Employee Code"
        name="employeeCode"
        value={formData.employeeCode}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email ID"
        name="emailId"
        type="email"
        value={formData.emailId}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Client Name"
        name="clientName"
        value={formData.clientName}
        onChange={handleChange}
        required
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={formData.role}
          onChange={handleSelectChange}
          required
        >
          {isAdmin ? (
            roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))
          ) : (
            <MenuItem key={-1} value={-1} disabled={true}>
              No Roles Available
            </MenuItem>
          )}
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Switch checked={formData.isActive} onChange={handleSwitchChange} />
        }
        label="Active"
      />

      <Box mt={2}>
        <Button
          type="submit"
          disabled={loading}
          variant="contained"
          color="primary"
          fullWidth
        >
          {loading ? "Adding User..." : "Add User"}
        </Button>
      </Box>
    </form>
  );
};

export default AddUser;
