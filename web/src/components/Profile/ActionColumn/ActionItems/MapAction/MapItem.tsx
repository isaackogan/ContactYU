import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {Component} from "react";
import {ProfileData} from "../../../../../pages/Profile";
import {styled} from "styled-components";
import L from 'leaflet';

interface IProps {
    data: ProfileData
}

interface IState {
    lat?: number,
    lon?: number,
    loaded: boolean
}

const Container = styled.div`
  border-radius: 15px;
  height: 100%;
  width: 100%;
`;

export default class MapItem extends Component<IProps, IState> {

    private readonly address?: string;
    private readonly building?: string;
    private loadStart: boolean;

    constructor(props: IProps) {
        super(props);

        this.address = props.data.address;
        this.building = props.data.building;

        this.loadStart = false;

        this.state = {
            loaded: false,
            lat: undefined,
            lon: undefined
        }
    }

    async componentDidMount() {

        if (this.loadStart) return;
        this.loadStart = true;

        this.searchLocation().then((result) => {

            if (!(result != null && result[0] && result[1])) {
                return;
            }

            this.setState({
                loaded: true,
                lat: result[0],
                lon: result[1]
            });

        }).catch(() => {
            this.setState({
                loaded: false
            });
        })

    }

    static adjustKeele(address: string): string {

        let idx = address.search(/(\d+)\s+Keele/gi);

        return (
            idx > 0 ? address.substring(idx) : address
        );
    }

    static adjustGlendon(address: string): string {

        let idx = address.search(/(\d+)\s+Bayview/gi);

        return (
            idx > 0 ? address.substring(idx) : address
        );

    }

    static encodeAddress(mapAddress: string): string | null {

        // Get address
        let address = mapAddress
            .replace(/,/g, "");

        // Make adjustments
        address = MapItem.adjustGlendon(address);
        address = MapItem.adjustKeele(address);

        // Encode & fix
        return encodeURIComponent(address)
            .replace(/%20/g, "+");

    }

    async searchLocation(): Promise<[number, number] | null> {

        if (!this.building) {
            return null;
        }

        //let address = this.encodeAddress();

        const queryUrl: string = (
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.building)}&format=json`
        );

        const result = await fetch(queryUrl);

        const {lat, lon} = (await result.json())[0];
        return [lat, lon];

    }

    render() {

        if (!this.state.loaded) {
            return null;
        }

        if (!(this.state.lat && this.state.lon)) {
            return null;
        }

        const icon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            className: "main-popup-icon"
        });

        return (

            <Container>
                <MapContainer
                    attributionControl={false}
                    style={{borderRadius: "10px", height: "100%", width: "100%"}}
                    id={"map"}
                    center={[this.state.lat, this.state.lon]}
                    zoom={16}
                    scrollWheelZoom={false}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker icon={icon} position={[this.state.lat, this.state.lon]}>
                        <Popup>
                            <strong>{this.address}</strong>
                        </Popup>
                    </Marker>
                </MapContainer>
            </Container>
        )
    }
}


