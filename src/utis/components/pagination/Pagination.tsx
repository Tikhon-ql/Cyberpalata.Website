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

    function increasePage()
    {
        if(curPage < pages.length)
        {
            setCurPage(curPage + 1);
        }
    }

    function decreasePage()
    {
        if(curPage > 0)
        {
          setCurPage(curPage - 1);
        }
    }

    return(
        <div className="wrapper">
        <ul className="pagination">
          {/* <li><a href=""><span>First</span></a></li>
          <li><a href=""><span>Previous</span></a></li> */}
          <a>
            <img style={{width:"50px",height:"50px"}} onClick={()=>{decreasePage()}} src={require(`./../../../assets/imgs/plus.png`)}/>
          </a>
          {pages.length > 1 && pages.map((item:number, index)=>{
                console.log("Page:" + item);
                console.log("Cur page: "+ curPage);
                return <li key={index} style={{"backgroundColor":`${curPage === item ? "gray" : "white"}`}} onClick={()=>{setCurPage(item)}}><a>{item}</a></li>
          })}
          <a>
            <img style={{width:"50px",height:"50px"}} onClick={()=>{increasePage()}} src={require(`./../../../assets/imgs/plus.png`)}/>
          </a>
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