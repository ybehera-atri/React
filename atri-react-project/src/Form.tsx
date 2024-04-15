/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useEffect } from "react";
import './styles.css'

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
    <Container className="mt-0 pt-4">
      <Row>
        <Col md={6} className="offset-md-3">
          <Card className="bg-light text-dark">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>
              Food Item: <br></br> <br></br>
              <Form.Control
                type="text"
                id="food_item"
                {...register("itemName", { required: true })}
                placeholder="Enter food item"
              />
            </Form.Label>
          </Form.Group>

          <Form.Group className="mb-4">
            Is This Food a Favorite?
            
            <Form.Label>
              <Form.Check
                className="custom-form-check"
                id="yes-radio"
                type="radio"
                label="Yes"
                value="Yes"
                {...register("fav")}
              />
            </Form.Label>
            <Form.Label>
              <Form.Check
                className="custom-form-check"
                id="no-radio"
                type="radio"
                label="No"
                value="No"
                {...register("fav")}
              />
            </Form.Label>
            <Form.Label>
              <Form.Check
                className="custom-form-check"
                id="maybe-radio"
                type="radio"
                label="Maybe"
                value="Maybe"
                {...register("fav")}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            What type? <br></br> <br></br>
            <Form.Label>
              <Form.Check
                className="custom-form-check"
                id="gluten"
                type="checkbox"
                label="Gluten Free"
                value="No Gluten  "
                {...register("isVegan")}
              />
            </Form.Label>
            <Form.Label>
              <Form.Check
                className="custom-form-check"
                id="vegan"
                type="checkbox"
                label="Vegan"
                value="Vegan "
                {...register("isVegan")}
              />
            </Form.Label>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
        </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormPage;
