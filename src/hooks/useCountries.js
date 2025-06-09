import { useState, useEffect } from 'react'
export const useCountries = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = () => {
    // fetch('https://corsproxy.io/?url=https://www.apicountries.com/countries')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setCountries(data)
    //   })
    //   .catch((error) => console.log(error))
  }

  return countries
}
