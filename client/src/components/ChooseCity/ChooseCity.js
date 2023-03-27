import React, { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useGeoList } from '../../queries/geoQueries'
import './ChooseCity.scss'

const ChooseCity = ({cityId, setCityId}) => {
  const geoQuery = useGeoList()
  const [currentDistrict, setCurrentDistrict] = useState()
  const [currentRegion, setCurrentRegion] = useState()

  const regions = currentDistrict ? geoQuery.data.regions.filter(el => el.DistrictId == currentDistrict) : null
  const cities = currentRegion ? geoQuery.data.cities.filter(el => el.RegionId == currentRegion) : null

  if (geoQuery.isLoading) {
    return <div />
  }

  return (
    <div className="choose-city">
      <div className='items-wrapper'>
        <ul className='items districts-items'>
          <Scrollbars>
            {geoQuery.data.districts.map(district => (
              <li 
                key={district.id} 
                onClick={e => setCurrentDistrict(district.id)} 
                className={`${district.id == currentDistrict ? 'active' : ''}`}
              >
                {district.title}
              </li>
            ))}
          </Scrollbars>
        </ul>
        <ul className='items regions-items'>
          <Scrollbars>
            {regions && regions.map(region => (
              <li 
                key={region.id}
                onClick={e => setCurrentRegion(region.id)} 
                className={`${region.id == currentRegion ? 'active' : ''}`}
              >
                {region.title}
              </li>
            ))}
          </Scrollbars>
        </ul>
        <ul className='items cities-items'>
          <Scrollbars>
            {cities && cities.map(city => (
              <li 
                key={city.id}
                onClick={e => setCityId(city.id)} 
                className={`${city.id == cityId ? 'active' : ''}`}
              >
                {city.title}
              </li>
            ))}
          </Scrollbars>
        </ul>
      </div>
    </div>
  )
}

export default ChooseCity