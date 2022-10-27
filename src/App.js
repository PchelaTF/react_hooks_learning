import { Component, useState, useEffect, useCallback, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';

// class Slider extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0
//         }
//     }

//     componentDidMount() {
//         document.title = `Slide: ${this.state.slide}`
//     }

//     componentDidUpdate() {
//         document.title = `Slide: ${this.state.slide}`
//     }

//     changeSlide = (i) => {
//         this.setState(({ slide }) => ({
//             slide: slide + i
//         }))
//     }

//     toggleAutoplay = () => {
//         this.setState(({ autoplay }) => ({
//             autoplay: !autoplay
//         }))
//     }

//     render() {
//         return (
//             <Container>
//                 <div className="slider w-50 m-auto">
//                     <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                     <div className="text-center mt-5">Active slide {this.state.slide} <br /> {this.state.autoplay ? 'auto' : null}</div>
//                     <div className="buttons mt-3">
//                         <button
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}>-1</button>
//                         <button
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}>+1</button>
//                         <button
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}>toggle autoplay</button>
//                     </div>
//                 </div>
//             </Container>
//         )
//     }
// }

const countTotal = (num) => {
    console.log('counting')
    return num + 10
}

const Slider = (props) => {

    const [slide, setSlide] = useState(0)
    const [autoplay, setAutoplay] = useState(false)

    // const [state, setState] = useState({ slide: 0, autoplay: false })

    const getSomeImg = useCallback(() => {
        console.log('fetching')
        return [
            'https://cdn.pixabay.com/photo/2022/10/16/13/53/early-morning-7525151__340.jpg',
            'https://cdn.pixabay.com/photo/2022/10/05/20/43/hyacinth-macaw-7501470__340.jpg',
            'https://cdn.pixabay.com/photo/2022/10/15/21/23/cat-7523894__340.jpg'
        ]
    }, [])

    function logging() {
        console.log('log')
    }

    useEffect(() => {
        document.title = `Slide: ${slide}`

        // window.addEventListener('click', logging)

        // return () => {
        //     window.removeEventListener('click', logging)
        // }

    }, [slide])

    useEffect(() => {
        console.log('autoplay')
    }, [autoplay])

    function changeSlide(i) {
        setSlide(slide => slide + i)
    }

    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay)
    }

    // function changeSlide(i) {
    //     setState(state => ({ ...state, slide: state.slide + i }))
    // }

    // function toggleAutoplay() {
    //     setState(state => ({ ...state, autoplay: !state.autoplay }))
    // }

    const total = useMemo(() => {
        return countTotal(slide)
    }, [slide])

    const style = useMemo(() => ({
        color: slide > 4 ? 'red' : 'black'
    }), [slide])

    useEffect(() => {
        console.log('style!')
    }, [style])

    return (
        <Container>
            <div className="slider w-50 m-auto">

                {/* {
                    getSomeImg().map((url, i) => {
                        return (
                            <img key={i} className="d-block w-100" src={url} alt="slide" />

                        )
                    })
                } */}

                <Slide getSomeImg={getSomeImg}/>

                <div className="text-center mt-5">Active slide {slide} <br /> {autoplay ? 'auto' : null}</div>
                <div style={style} className="text-center mt-5">Total slides: {total}</div>
                <div className="buttons mt-3">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImg}) => {
    const [img, setImg] = useState([])

    useEffect(() => {
        setImg(getSomeImg())
    }, [getSomeImg])

    return (
        <>
            {img.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" />)}
        </>
    )
}


function App() {
    const [slider, setSlider] = useState(true)

    return (
        <>
            <button onClick={() => setSlider(false)}>Click</button>
            { slider ? <Slider /> : null }
        </>
    );
}

export default App;
