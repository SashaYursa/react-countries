import { useCountries } from './hooks/useCountries'
// import './App.css'
import { useEffect, useState } from 'react'

export const App = () => {
  const countries = useCountries()

  const [selectedCountry, setSelectedCountry] = useState(null)
  const [guessedCountries, setGuessedCountries] = useState([])
  const [options, setOptions] = useState([])

  useEffect(() => {
    const selectedCountry = getRandomCountry([guessedCountries])

    const options = []

    Array.from({ length: 2 }).forEach(() => {
      options.push(
        getRandomCountry([selectedCountry, ...guessedCountries, ...options])
      )
    })

    setSelectedCountry(selectedCountry)

    const shuffledOptions = shuffleArray([selectedCountry, ...options])
    setOptions(shuffledOptions)
  }, [countries])

  console.log(selectedCountry, options)

  const getRandomCountry = (exceptedCountries) => {
    let country = findCountry()

    while (exceptedCountries.some((c) => c?.name === country?.name)) {
      country = findCountry()
    }

    return country
  }

  const findCountry = () => {
    return countries[Math.floor(Math.random() * countries.length)]
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const onSelectCountry = (country) => () => {
    console.log('asnwered')
  }

  return (
    <div className='outerContainer'>
      {/* <h1>Вгадай країну за прапором</h1>
      <img src={selectedCountry?.flag} alt='Прапор' className='flag' />

      <div className='answerButtons'>
        {options.map((country) => (
          <button
            key={country.name}
            className='custom-btn'
            onClick={onSelectCountry(country)}
          >
            {country.name}
          </button>
        ))}
      </div> */}
    </div>
  )
}
