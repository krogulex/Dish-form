import React from "react";

import css from "./Form.module.css";

import { useFormik } from "formik";

import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  FormControl,
} from "@mui/material";

export interface FormProps {}

const Form: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      preparation_time: "",
      type: "",
      no_of_slices: "",
      diameter: "",
      spiciness_scale: "",
      slices_of_bread: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });
  return (
    <div className={css.content}>
      <form onSubmit={formik.handleSubmit} className={css.form}>
        <TextField
          name="name"
          type="text"
          label="Dish name"
          placeholder="Enter dish name"
          onChange={formik.handleChange}
          value={formik.values.name}
          variant="outlined"
          className={css.inputField}
          required
        />
        <TextField
          inputProps={{ step: 1 }}
          type="time"
          name="preparation_time"
          label="Preparation time"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={formik.handleChange}
          value={formik.values.preparation_time}
          className={css.inputField}
          required
        />
        <FormControl className={css.inputField} required>
          <InputLabel>Select dish type</InputLabel>
          <Select
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
            label="Preparation time"
            required
          >
            <MenuItem value="pizza">pizza</MenuItem>
            <MenuItem value="soup">soup</MenuItem>
            <MenuItem value="sandwich">sandwich</MenuItem>
          </Select>
        </FormControl>

        {formik.values.type === "pizza" && (
          <div className={css.pizzaContent}>
            <TextField
              name="no_of_slices"
              type="number"
              label="Number of slices"
              placeholder="Enter number of slices"
              onChange={formik.handleChange}
              value={formik.values.no_of_slices}
              inputProps={{
                step: "1",
              }}
              className={css.pizzaInput}
              required
            />
            <TextField
              type="number"
              inputProps={{
                step: "0.1",
              }}
              name="diameter"
              label="diameter"
              onChange={formik.handleChange}
              value={formik.values.diameter}
              className={css.pizzaInput}
              required
            />
          </div>
        )}
        {formik.values.type === "soup" && (
          <FormControl className={css.inputField} required>
            <InputLabel>Select spiciness scale</InputLabel>
            <Select
              name="spiciness_scale"
              onChange={formik.handleChange}
              value={formik.values.spiciness_scale}
              label="Select spiciness scale"
              required
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="6">6</MenuItem>
              <MenuItem value="7">7</MenuItem>
              <MenuItem value="8">8</MenuItem>
              <MenuItem value="9">9</MenuItem>
              <MenuItem value="10">10</MenuItem>
            </Select>
          </FormControl>
        )}
        {formik.values.type === "sandwich" && (
          <TextField
            name="slices_of_bread"
            type="number"
            label="Number of slices"
            placeholder="Enter number of slices"
            onChange={formik.handleChange}
            value={formik.values.slices_of_bread}
            inputProps={{
              step: "1",
            }}
            className={css.inputField}
            required
          />
        )}
        <Button type="submit" variant="contained" className={css.button}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
