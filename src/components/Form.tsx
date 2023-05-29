import React from "react";

import css from "./Form.module.css";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  FormControl,
} from "@mui/material";

import axios from "axios";

export interface FormProps {}

axios.defaults.baseURL =
  "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/";

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
/*       axios
        .post("dishes/", { values })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        }); */

      resetForm();
    },
     validationSchema: Yup.object({
      name: Yup.string().required("Dish name is required!"),
      preparation_time: Yup.string().required("Preparation time is required!"),
      type: Yup.string().required("Dish type is required!"),
      no_of_slices: Yup.number().when("type", (type, schema) => {
        if (String(type) === "pizza") {
          console.log(schema)
          return schema 
          .required("Number of slices is required!")
          .min(1, "Number must be greater than 0");
        }
        return schema.notRequired()
      }),
      diameter: Yup.number().when("type", (type, schema) => {
        if (String(type) === "pizza") {
          console.log(schema)
          return schema
          .required("Diameter is required!")
          .min(0, "Number must be greater than 0");
        }
        return schema.notRequired()
      }),
      spiciness_scale: Yup.number().when("type", (type, schema) => {
        if (String(type) === "pizza") {
          return schema.required("Spiciness scale is required!")
        }
        return schema.notRequired()
      }),
      slices_of_bread: Yup.number().when("type", (type, schema) => {
        if (String(type) === "sandwich") {
          return schema 
          .required("Number of slices is required!")
          .min(1, "Number must be greater than 0");
        }
        return schema.notRequired()
      }),
    }),
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
          sx={{ m: 2 }}
        />
        <div className={css.error}>
          {formik.errors.name && formik.touched.name && formik.errors.name}
        </div>
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
          sx={{ m: 2 }}
        />
        <div className={css.error}>
          {formik.errors.preparation_time &&
            formik.touched.preparation_time &&
            formik.errors.preparation_time}
        </div>

        <FormControl className={css.inputField} sx={{ m: 2 }}>
          <InputLabel>Select dish type</InputLabel>
          <Select
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
            label="Preparation time"
          >
            <MenuItem value="pizza">pizza</MenuItem>
            <MenuItem value="soup">soup</MenuItem>
            <MenuItem value="sandwich">sandwich</MenuItem>
          </Select>
        </FormControl>
        <div className={css.error}>
          {formik.errors.type && formik.touched.type && formik.errors.type}
        </div>

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
              sx={{ m: 2, marginLeft: "0px" }}
            />
            <div className={css.error}>
              {formik.errors.no_of_slices &&
                formik.touched.no_of_slices &&
                formik.errors.no_of_slices}
            </div>
            <TextField
              type="number"
              inputProps={{
                step: "0.1",
              }}
              name="diameter"
              label="Diameter"
              onChange={formik.handleChange}
              value={formik.values.diameter}
              className={css.pizzaInput}
              sx={{ m: 2, marginLeft: "0px" }}
            />
            <div className={css.error}>
              {formik.errors.diameter &&
                formik.touched.diameter &&
                formik.errors.diameter}
            </div>
          </div>
        )}
        {formik.values.type === "soup" && (
          <FormControl className={css.inputField} sx={{ m: 2 }}>
            <InputLabel>Select spiciness scale</InputLabel>
            <Select
              name="spiciness_scale"
              onChange={formik.handleChange}
              value={formik.values.spiciness_scale}
              label="Select spiciness scale"
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
            <div className={css.error}>
              {formik.errors.spiciness_scale &&
                formik.touched.spiciness_scale &&
                formik.errors.spiciness_scale}
            </div>
          </FormControl>
        )}
        {formik.values.type === "sandwich" && (
          <div className={css.inputField}>
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
              sx={{ m: 2, margin: "0px" }}
            />
            <div className={css.error}>
              {formik.errors.spiciness_scale &&
                formik.touched.spiciness_scale &&
                formik.errors.spiciness_scale}
            </div>
          </div>
        )}
        <Button
          type="submit"
          variant="contained"
          className={css.button}
          sx={{ m: 2 }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
