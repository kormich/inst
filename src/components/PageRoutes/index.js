import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "../../pages/MainPage";
import UserPage from "../../pages/UserPage";
import NoAccessPage from "../../pages/NoAccessPage";
import {useDispatch, useSelector} from "react-redux";
import {getAuthorizedUser} from "../../redux/actions/users";
import {Bars} from "react-loader-spinner";
import './style.css'
import {useEffect} from "react";

const authorizedRoutes =[
    {path: '/', element: <MainPage/>, exact: true},
    {path: '/:id', element: <UserPage/>, exact: true}
]
const PageRoutes = () =>{
    const authorizedUser = useSelector(state => state.users.authorizedUser)
    const isLoading = useSelector(state => state.users.isUserLoading)
    const dispatch =useDispatch()
    useEffect(()=>{
        dispatch(getAuthorizedUser())
    },[])

    if(isLoading){
        return (
            <div className="cnPageRoutesLoader">
                <Bars color="#009999" height={80} width={80}/>
            </div>
        )
    }

    return(
        <BrowserRouter>
            <Routes>
                {authorizedUser ? authorizedRoutes.map((route) => <Route {...route} key={route.path}/>) : <Route path="/" element={<NoAccessPage/>} exact/>}
            </Routes>
        </BrowserRouter>
    )
}
export default PageRoutes;