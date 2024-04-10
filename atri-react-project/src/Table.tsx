/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useTable, Column } from 'react-table';
import { Link, useNavigate } from 'react-router-dom';

interface IFoodItem {
    id: number;
    name: string;
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
                Header: 'Favorites',
                Cell: ({ row }) => (
                    <div>
                        <input type="checkbox" value={row.original.id}/>
                    </div>
                )
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

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;


return (
    <div>
        <h2> Food Item </h2>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>

                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>

        </table>
        <Link to="/">Back to Home </Link>
    </div>
)
            };


export default TableView