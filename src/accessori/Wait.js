import { RingLoader } from "react-spinners"

export const Wait = ({ loading }) => {
    return (
        <RingLoader size="100px" color="#D7365D" loading={loading} speedMultiplier={1} />
    )
}