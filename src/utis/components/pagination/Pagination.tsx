export const Pagination = ({
    pageCount,
    curPage,
    setCurPage,
    totalItemsCount,
    actualSize
}: any) =>
{
    var pages:number[] = [];
    console.log("Pagination");
    console.log(totalItemsCount);
    console.log(pageCount);
    for(var i:number = 1; i <= Math.ceil(totalItemsCount / pageCount);i++)
    {
        pages.push(i);
    }
    return(
        <div className="wrapper">
        <ul className="pagination">
          {/* <li><a href=""><span>First</span></a></li>
          <li><a href=""><span>Previous</span></a></li> */}
          {pages.length > 1 && pages.map((item:number, index)=>{
                return <li key={index} onClick={()=>{setCurPage(item)}}><a>{item}</a></li>
          })}
          {/* <li><a href=""><span>Next</span></a></li>
          <li><a href=""><span>Last</span></a></li> */}
        </ul>  
      </div>
    )
};

//classNameNameName = {page == curPage? 'page-item active' : 'page-item'}
//classNameNameName="page-link" 

// <ul classNameNameName="myPagination">
//             {pages.length > 1 && <div>
//                 {pages.map((page,index) => {
//                     return <li key={index} onClick={()=>{setCurPage(page)}}><a >{page}</a></li>
//                 })}</div>}
//         </ul>