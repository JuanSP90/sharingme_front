import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu/Menu';
import './Explore.css';
import axios from 'axios';
import ExploreCard from '../../components/ExploreCard/ExploreCard';
import ReactPaginate from 'react-paginate';
import { Helmet } from 'react-helmet';

const Explore = () => {
    const [users, setUsers] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 9;

    const URLBACKEND = process.env.REACT_APP_URL_BACKEND;

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${URLBACKEND}/users/`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error al obtener los usuarios', error);
        }
    };

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    return (
        <div className="ExplorePage">
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                />
            </Helmet>
            <Menu />
            <div className="ExploreCardContainer">
                {users.slice(itemOffset, itemOffset + itemsPerPage).map((user) => (
                    <ExploreCard key={user.id} userName={user.userName} backgroundColor={user.backgroundColor} description={user.description} location={user.location} tag1={user.tag1} tag2={user.tag2} tag3={user.tag3} />
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
