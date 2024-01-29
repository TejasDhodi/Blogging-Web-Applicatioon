import React, { useState } from 'react'
import { data } from '../Services/Data'

const FilterComponent = ({ search, setSearch, handleDomainFilter, handleCategoryFilter }) => {

    const [expandFilter, setExpandFilter] = useState(false);
    const [domainFilter, setDomainFilter] = useState({
        domain: '',
        category: '',
        technology: ''
    })

    const handleExpand = () => {
        setExpandFilter(!expandFilter);
    }

    const handleFilter = (e) => {
        setDomainFilter({
            ...domainFilter,
            domain: e.target.value
        })
        console.log(e.target.value);
        handleDomainFilter(e.target.value);
    }

    const domains = [...new Set(data.map((e) => e.value)), 'All'];
    const cateories = [...new Set(data.flatMap((e) => e.category.map((e) => e.value)))];

    return (
        <>
            <div className="searchFilter">
                <input type="text"
                    className={expandFilter ? 'searchInput activeSearchInput' : 'searchInput'}
                    name="search"
                    value={search}
                    onClick={() => handleExpand()}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='🔍 Search By Name'
                    autoComplete='off' />

                <select name="domain" className='searchDomain' value={domainFilter.domain} onChange={handleFilter}>
                    <option value="" disabled>Select Domain</option>
                    {
                        domains.map((currElem, index) => {
                            return <option value={currElem} key={index}>{currElem}</option>
                        })
                    }
                </select>
            </div>
            <div className="multiFilter" onClick={() => setExpandFilter(false)}>
                {
                    domainFilter.domain && domainFilter.domain !== 'All' && (
                        <div className="categoryFilter">
                            {

                                cateories.map((currElem, index) => {
                                    return (
                                        <button type='button' onClick={() => handleCategoryFilter(currElem)} key={index}>{currElem}</button>
                                    )
                                })
                            }   
                        </div>
                    )
                }
            </div>

        </>
    )
}

export default FilterComponent
