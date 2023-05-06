import Layout from "../../components/Layout";
import DetailedCard from "../../components/DetailedCard";

const MainPage = () => {
    return (
        <Layout nickName={"Artem"} id={1}>
            <div>main page</div>
            <DetailedCard
                userName="Artem"
                userId={1}
                imgUrl="https://mobimg.b-cdn.net/v3/fetch/1b/1bbe0c30fd8b9cd89656e6dc6d5e59a7.jpeg"
                likes={10}
                isLikedYourself={true}
                comments={[{text: 'asd', nickName: 'Afgor'},{text: 'asd', nickName: 'Afgor'},{text: 'asd', nickName: 'Afgor'}]}/>
        </Layout>
    )
}
export  default MainPage;