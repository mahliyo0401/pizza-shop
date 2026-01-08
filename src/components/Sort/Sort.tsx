import  { useEffect, useState, type FC } from 'react'
import Select from 'react-select'
import './Sort.scss'
import { productStore } from "../../store/productStore"
import { useTranslation } from 'react-i18next'

const options = [
  { value: '', id: 'all', label: 'Все товары' },
  { value: 'price', id: 'price_sort', label: 'Цене' },
  { value: 'rating', id: 'rating_sort', label: 'Рейтингу' },
  { value: 'title', id: 'title_sort', label: 'Названию' }
]

const Sort:FC = () => {
  
  const { t } = useTranslation()
  const { setSortValue, sortValue } = productStore()
  const [selectedOption, setSelectedOption] = useState<typeof options[0] | null>(null)

  const translatedOptions = options.map(option => ({
    ...option,
    label: t(option.id) 
  }));
  
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: '200px',
      height: '50px',
      border: '1px solid #efefef',
      borderRadius: '10px',
      background: 'rgb(252, 252, 253)',
      color: 'red',
      fontSize: '14px',
      fontWeight: '400',
      boxShadow: 'none',
      padding: '0px 12px'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontFamily: 'var(--font-family)',
      fontWeight: '400',
      fontSize: '14px',
      textAlign: 'justify',
      color: '#9aa0b4',
    }),
    indicatorsContainer: () => ({
      display: 'none' 
    }),
  };
  
  const changeSortValue  = (option: any) => {
    setSortValue(option.value)
    setSelectedOption(option)
  }
  
 useEffect(() => {
    const option = translatedOptions.find((item) => item.value == sortValue);
    setSelectedOption(option);
  }, [sortValue, t]);
  
  return (
   <>
    <Select
      value={selectedOption}
      onChange={changeSortValue}
      options={translatedOptions}
      placeholder={t('sort_placeholder')}
      styles={customStyles}
    />
   </>
  )
}

export default Sort