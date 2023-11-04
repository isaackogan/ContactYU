import {Component} from "react";
import {styled} from "styled-components";
import Header from "../components/Header";
import Hero from "../components/Profile/Hero";
import Loading from "../components/Profile/Loading/Loading";
import ContactColumn from "../components/Profile/ContactColumn/ContactColumn";
import ActionColumn from "../components/Profile/ActionColumn/ActionColumn";
import {useParams} from "react-router-dom";

const Container = styled.div`
  width: 100%;
`;

export interface ProfileData {
    address?: string,
    building?: string,
    atlas_id?: number,
    email?: string,
    first_name?: string,
    image_url?: string,
    last_name?: string,
    mobile?: string,
    ms_bookings_url?: string,
    title?: string,
    work?: string,
    work_ext?: string,
    [key: string]: boolean | number | string | null | undefined
}

interface IHomeProps {
    userId?: string
}

interface IHomeState {
    data: ProfileData | null;
    softTimeout: boolean
}

export default function Profile() {
    let {id} = useParams();

    return (
        <Page userId={id}/>
    )
}


const MAX_LOAD_TIME = 2500;

class Page extends Component<IHomeProps, IHomeState> {

    #loading: boolean;

    constructor(props: IHomeProps) {
        super(props);

        this.state = {data: null, softTimeout: false};
        this.#loading = false;
    }

    softTimeout(): void {
        setTimeout(() => {
            if (!this.#loading) {
                return;
            }
            this.setState({softTimeout: true})
        }, MAX_LOAD_TIME);
    }

    onData(data: ProfileData | null) {
        this.setState({data: data});
        this.#loading = false;

        // Set page title
        if (data !== null) {
            this.updatePageTitle(data);
        }
    }

    updatePageTitle(data: ProfileData) {
        let el = document.getElementById("title");
        if (!el) return;
        el.innerText = `ContactYU @ ${data?.first_name} ${data?.last_name?.substring(0, 1)}`;
    }

    onDataError() {
        console.log("Page Loading failed.");
        this.onLoadError();
    }

    async componentDidMount() {

        if (this.#loading) return;
        this.#loading = true;

        if (this.props.userId == null) return;

        // Load Data
        this.loadData(this.props.userId)
            .then(this.onData.bind(this))
            .catch(this.onDataError.bind(this));

        // Handle slow Loading case
        this.softTimeout();

    }

    onLoadError() {
        if (import.meta.env.PROD) {
            //window.location.href = import.meta.env.VITE_LOAD_FAIL_REDIRECT;
        }
    }

    async loadData(id: string): Promise<ProfileData | null> {

        const response = await fetch(
            import.meta.env.VITE_API_BASE +
            `/profile?id=${id}`
        );

        if (response.status === 404) {
            window.location.href = "/404";
            return null;
        }

        return (await response.json())?.data || null;
    }

    render() {

        // Loaded Successfully
        if (!this.#loading && this.state.data != null) {
            return (
                <Container>
                    <Header/>
                    <Hero data={this.state.data} />
                    <ContactColumn data={this.state.data} />
                    <ActionColumn data={this.state.data} />
                </Container>
            );
        }

        // Loading more than T seconds
        return (
            <Container>
                <Header/>
                {this.state.softTimeout ? <Loading/> : null}
            </Container>
        )

    }

}

