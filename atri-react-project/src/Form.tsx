/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'

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
     <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Food Item:
                <input {...register('itemName', { required: true })} /> 
            </label>
            <br></br>
            <br></br>
            <label>
                Add to Favorites
                <input type="radio" value="Yes" {...register("fav")} /> 
            </label>
            <br></br>
            <br></br>
            <button type = "submit">Submit</button>
        </form>
     </div>
    )
  };

  export default FormPage