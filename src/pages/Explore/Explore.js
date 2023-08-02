import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu/Menu';
import './Explore.css';
import axios from 'axios';
import ExploreCard from '../../components/ExploreCard/ExploreCard';
import MapWithMarkers from '../../components/Map/Map';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import ReactPaginate from 'react-paginate';
import { Helmet } from 'react-helmet';

const Explore = () => {
    const [users, setUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/users/`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error al obtener los usuarios', error);
        }
    };

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    return (
        <div className="ExplorePage">
            <Helmet>
                {/* Agrega el enlace al archivo de estilos de Bootstrap aquí */}
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                />
            </Helmet>
            <Menu />
            <div className="ExploreCardContainer">
                {users.slice(itemOffset, itemOffset + itemsPerPage).map((user) => (
                    <ExploreCard key={user.id} userName={user.userName} backgroundColor={user.backgroundColor} />
                ))}
            </div>
            <ReactPaginate
                className='paginationExplore'
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={Math.ceil(users.length / itemsPerPage)}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </div>
    );
};

export default Explore;
