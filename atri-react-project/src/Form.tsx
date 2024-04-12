/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useEffect } from "react";

interface IFormInput {
  itemName: string;
  id?: number;
  fav: string;
  isVegan: string;
}

const FormPage = ({
  onAdd,
  onEdit,
}: {
  onAdd: (itemName: string, fav: string, isVegan: string) => void;
  onEdit: (id: number, itemName: string, fav: string, isVegan: string) => void;
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const itemToEdit = location.state as IFormInput | undefined;
  const { register, handleSubmit, reset, setValue } = useForm<IFormInput>();

  useEffect(() => {
    if (itemToEdit) {
      setValue("itemName", itemToEdit.itemName);
      setValue("fav", itemToEdit.fav);
      setValue("isVegan", itemToEdit.isVegan);
    }
  }, [itemToEdit, setValue]);

  const onSubmit = (data: IFormInput) => {
    if (id) {
      onEdit(Number(id), data.itemName, data.fav, data.isVegan);
    } else {
      onAdd(data.itemName, data.fav, data.isVegan);
    }

    reset();
    navigate("/table");
  };

  return (
    <Container className="mt-5">
      <Row>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>
              Food Item:
              <Form.Control
                type="text"
                id="food_item"
                {...register("itemName", { required: true })}
                placeholder="Enter food item"
              />
            </Form.Label>
          </Form.Group>

          <Form.Group className="mb-3">
            Is This Food a Favorite?
            <Form.Label>
              <Form.Check
                id="yes-radio"
                type="radio"
                label="Yes"
                value="Yes"
                {...register("fav")}
              />
            </Form.Label>
            <Form.Label>
              <Form.Check
                id="no-radio"
                type="radio"
                label="No"
                value="No"
                {...register("fav")}
              />
            </Form.Label>
            <Form.Label>
              <Form.Check
                id="maybe-radio"
                type="radio"
                label="Maybe"
                value="Maybe"
                {...register("fav")}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            Is This Vegan?
            <Form.Label>
              <Form.Check
                id="yes-check"
                type="checkbox"
                label="Yes"
                value="Yes"
                {...register("isVegan")}
              />
            </Form.Label>
            <Form.Label>
              <Form.Check
                id="no-check"
                type="checkbox"
                label="No"
                value="No"
                {...register("isVegan")}
              />
            </Form.Label>
            <Form.Label>
              <Form.Check
                id="notsure-check"
                type="checkbox"
                label="Not sure"
                value="Not sure"
                {...register("isVegan")}
              />
            </Form.Label>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Row>
    </Container>
  );
};

export default FormPage;
