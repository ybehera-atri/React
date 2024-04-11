/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useTable, Column } from 'react-table';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Container } from 'react-bootstrap'

interface IFoodItem {
    id: number;
    name: string;
    fav: string;
}

interface TableViewProps {
    items: IFoodItem[];
}

const TableView = ({ items, onDelete }: { items: IFoodItem[], onDelete: (id: number) => void }) => {

    const navigate = useNavigate();
    React.useMemo(() => items, [items]);

    const columns : Column<IFoodItem>[] = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
                Cell: ({ value }: { value: number}) => (
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        const item = items.find(item => item.id === value);
                        if (item) navigate('/edit/'+item.id, { state: {id: item.id, itemName: item.name }});
                        
                    }}>
                        {value}
                    </a>
                )
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Favorite',
                accessor: 'fav',
            },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <div>
                        <button onClick={() => onDelete(row.original.id)}>Delete</button>
                    </div>
                )
            },
           
        ],
        [navigate, onDelete, items]
    );

    const tableInstance = useTable({columns, data: items});


return (
    <Container>
        <Table striped bordered hover variant='dark' responsive>
            <thead>
                {tableInstance.headerGroups.map(headerGroups => (
                    <tr {...headerGroups.getHeaderGroupProps()}>
                        {headerGroups.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...tableInstance.getTableBodyProps()}>
                    {tableInstance.rows.map(row => {
                        tableInstance.prepareRow(row);
                        return(
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        )
                    })}
                    
                    </tbody>


        </Table>
    </Container>
)
            };


export default TableView