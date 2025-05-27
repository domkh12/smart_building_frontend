import {useParams} from "react-router-dom";
import {useGetUserByIdQuery} from "../../redux/feature/users/userApiSlice";
import ViewDetailUser from "./ViewDetailUser";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent.jsx";
import {useEffect} from "react";

function ViewUser() {
    const {id} = useParams();
    const {data: user, isFetching, isSuccess, isError, error, refetch} = useGetUserByIdQuery(id);

    useEffect(() => {
        refetch();
    }, [refetch]);

    let content;

    if (isFetching) content = <LoadingFetchingDataComponent/>;

    else if (isSuccess && user) content = <ViewDetailUser user={user}/>
    else if (isError) {
        content = <div>Error: {error.data.error.description}</div>;
    } else {
        content = <div>Unexpected state: No building data found.</div>;
    }
    return content;
}

export default ViewUser;
