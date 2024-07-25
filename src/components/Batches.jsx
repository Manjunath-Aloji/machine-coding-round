import Input from "./Input"
import Page from "./Page"
import { getBatches } from "../utils/backend"
import { useCallback, useEffect, useRef, useState } from "react"
import Button from "./Button"
import { useForm } from "react-hook-form"

function Batches() {

  const [data, setData] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(2)
  const [currentPage, setCurrentPage] = useState(1)
  const searchValue = useRef(null)
  const TOTAL_PAGES = useRef(null)
  const {register, handleSubmit} = useForm()

  const getBatchesData = useCallback(() => {
    let start = currentPage == 1 ? 0 : ((currentPage - 1) * itemsPerPage)
    const {data, count} = getBatches(start, itemsPerPage, searchValue.current.value.trim())
    const pages = Math.ceil(parseInt(count) / itemsPerPage);
    TOTAL_PAGES.current = pages
    if(currentPage > pages) setCurrentPage(1)
    setData(data)
  }, [itemsPerPage, currentPage])

  const changeLimit = (e) => {
    setItemsPerPage(e.target.value)
  }

  const searchBatch = () => {
    getBatchesData()
  }

  useEffect(() => {
    getBatchesData()
  }, [getBatchesData])

  const pageNumbers = Array.from({ length: TOTAL_PAGES.current }, (_, index) => index + 1);
  return (
    <div className="w-full lg:w-9/12 bg-slate-50 p-4 mx-2 rounded-lg mb-20 md:mb-0">
      <div className="">
        <h1 className="font-bold text-2xl">Batches</h1>
        <p className="text-sm">Create learner&apos;s batch and share information at the same time.</p>
      </div>
      <div className="w-full">
        <form className="flex py-2 gap-1 md:gap-4" onSubmit={handleSubmit(searchBatch)}>
          <Input
            {...register('search')}
            ref={searchValue} className='px-2 py-1 w-9/12 md:w-5/12 border border-primary bg-transparent' placeholder='Search by Title'
          />
          <Button type="submit" bgColor="bg-[#6C6BAF]" className="md:w-2/12" >Search</Button>
        </form>
        {/* <Input name='search' ref={searchValue} className='px-2 py-1 w-9/12 lg:w-4/12 border border-primary bg-transparent' placeholder='Search by Title' /> */}
        
      </div>
      <div className="w-full py-2 text-sm md:text-base font-extralight">
        <table className="w-full rounded-t-xl overflow-hidden">
          <thead className="w-full bg-slate-200">
            <tr className="p-4 border-b border-slate-500 border-opacity-50">
              <th className="text-left px-3 py-3" colSpan='4'>Title</th>
              <th className="text-left px-3">Start Date</th>
              <th className="text-left px-3">End Date</th>
              <th className="text-left px-3">Price</th>
              <th className="hidden md:table-cell text-left px-3">Validity</th>
              <th className="text-left px-3">Status</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {data.length > 0 ? data.map(batch => 
                <tr key={batch.id} className="p-4 border-b border-slate-800 border-opacity-50">
                  <td colSpan={4} className="text-left px-1 md:px-3 py-4 border-l border-r border-slate-500 border-opacity-50">
                    <div className="w-full flex flex-col md:flex-row items-center md:gap-2">
                      <img 
                        className="w-28 h-10 md:h-16 object-cover rounded-md" 
                        src={batch.course.thumbnail} 
                        alt={batch.course.name} 
                      />
                      <span>{batch.course.name}</span>
                    </div>
                  </td>
                  <td className="text-left px-3 py-4 border-l border-r border-slate-500 border-opacity-50">{batch.startDate}</td>
                  <td className="text-left px-3 py-4 border-l border-r border-slate-500 border-opacity-50">{batch.endDate}</td>
                  <td className="text-left px-3 py-4 border-l border-r border-slate-500 border-opacity-50">₹ {batch.course.price}</td>
                  <td className="hidden md:table-cell text-left px-3 py-4 border-l border-r border-slate-500 border-opacity-50">{batch.validity}</td>
                  <td className="text-left px-3 py-4 border-l border-r border-slate-500 border-opacity-50 "><span className={` ${batch.status === 'Published' ? 'bg-[#4ED04B]' : 'bg-[#A4A4A4]'} p-2 rounded-md text-xs bg-opacity-30`}>{batch.status}</span></td>
                </tr>
              // </div>
              
            ) : <tr className="w-full flex justify-center items-center"><td colSpan={12}>No Data</td></tr>}
          </tbody>
        </table>
        <div className="my-2 w-full">
          <div className="p-1 float-end">
            <span className="text-sm">Rows Per Page</span>
            <select className="px-1 py-2 mx-1 border border-slate-500 rounded-md border-opacity-50" value={itemsPerPage} onChange={changeLimit}>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="05">05</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>


          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-4 py-1 border border-slate-500 border-opacity-50 ${number === currentPage ? 'bg-[#6C6BAF] text-white' : 'bg-white text-blue-500'} `}
            >
              {number}
            </button>
          ))}
          </div>
          

        </div>
      </div>

    </div>
  )
}

const BatchesComponent = Page(Batches, 'bg-secondary', 'text-[#444B79]')

export default BatchesComponent