/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form'

interface IFormInput {
    itemName:string;
    id?: number;
}

const FormPage = ({ onAdd, onEdit }: { onAdd: (itemName: string) => void, onEdit: (id: number, itemName: string) => void }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const itemToEdit: IFormInput = location.state as IFormInput || {}
    const { register, handleSubmit, reset } = useForm<IFormInput>({defaultValues: {
        itemName : itemToEdit.itemName || ''
    }});

    const onSubmit = (data: IFormInput) => {
        if (itemToEdit.id) {
            onEdit(itemToEdit.id, data.itemName)
        }
        else{
            onAdd(data.itemName)
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
            <button type = "submit">Submit</button>
        </form>
     </div>
    )
  };

  export default FormPage