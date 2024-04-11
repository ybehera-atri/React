/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';



interface IFormInput {
    itemName:string;
    id?: number;
    fav: string;
}

const FormPage = ({ onAdd, onEdit }: { onAdd: (itemName: string, fav: string) => void, onEdit: (id: number, itemName: string, fav: string) => void }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams<{ id: string }>()
    const itemToEdit: IFormInput = location.state as IFormInput || {}
    const { register, handleSubmit, reset } = useForm<IFormInput>({defaultValues: {
        itemName : itemToEdit.itemName || '',
        fav: itemToEdit.fav || 'No',
    }});

    const onSubmit = (data: IFormInput) => {
        console.log(data)
        if (itemToEdit.id) {
            onEdit(itemToEdit.id, data.itemName, data.fav)
        }
        else{
            onAdd(data.itemName, data.fav)
        }
        
        reset();
        navigate('/table')
    }

  
    return (
     <Container className='mt-5'>
        <Row>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3'>
            <Form.Label>
                Food Item:
                <Form.Control type="text" {...register('itemName', { required: true })} placeholder='Enter food item' /> 
            </Form.Label>
            </Form.Group>

            <Form.Group className='mb-3'>
            <Form.Label>
                <Form.Check type="radio" label="Add to Favorites" value="Yes" {...register("fav")}/>
                </Form.Label>
            </Form.Group>
            <Button variant="primary" type = "submit">Submit</Button>
        </form>
        </Row>
     </Container>
    )
  };

  export default FormPage