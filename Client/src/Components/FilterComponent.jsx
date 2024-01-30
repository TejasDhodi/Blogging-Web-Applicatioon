import React, { useState } from 'react';
import { data } from '../Services/Data';
import '../Styles/Blogs.css'
const FilterComponent = ({ search, setSearch, handleDomainFilter, handleCategoryFilter }) => {
    const [domainFilter, setDomainFilter] = useState({
        domain: '',
        // category: '',
    });

    const domains = [...new Set(data.map((e) => e.value)), 'All'];
    const categories = [...new Set(data.flatMap((e) => e.category.map((e) => e.value)))];

    // To Handle Domain Filter onchange
    const handleFilter = (e) => {
        const { value } = e.target;

        setDomainFilter((prevFilter) => ({
            ...prevFilter,
            domain: value,
        }));

        handleDomainFilter(value);
    };


    return (
        <>
            <div className="searchFilter">
                <input
                    type="text"
                    className='searchInput'
                    name="search"
                    value={search}
                    onClick={() => handleExpand()}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="🔍 Search By Name"
                    autoComplete="off"
                />

                <select name="domain" className="searchDomain" value={domainFilter.domain} onChange={handleFilter}>
                    <option value="" disabled>
                        Select Domain
                    </option>
                    {domains.map((currElem, index) => (
                        <option value={currElem} key={index}>
                            {currElem}
                        </option>
                    ))}
                </select>
            </div>
            <div className="multiFilter">
                {
                    domainFilter.domain && domainFilter.domain !== 'All' && (
                        <div className="categoryFilter">
                            {categories.map((currElem, index) => (
                                <button type="button" onClick={() => handleCategoryFilter(currElem)} key={index}>
                                    {currElem}
                                </button>
                            ))}
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default FilterComponent;
