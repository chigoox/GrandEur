'use client'
import { Card, CardBody } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { APIProvider, Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import { Contact } from 'lucide-react'
import { updateDatabaseItem } from '@/app/myCodes/Database'




function Maps({ destinationPosition, originPosition, positionState, origin = '760 Springfield Ave, Irvington NJ', destination, orderTracking, updateOrderLocation, currentDriverLocation, driverPrevLocation, orderStatus }) {
    const [currentLocation, setCurrentLocation] = positionState || []
    const [position, setPosition] = useState({})
    //navigator.geolocation.getCurrentPosition(p => console.log(p), null, { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true })


    useEffect(() => {
        if (!orderTracking) return
        if (currentLocation?.length >= 2) setPosition({ lat: currentLocation[0], lng: currentLocation[1] })
        if (currentLocation?.length >= 2) updateOrderLocation({ lat: currentLocation[0], lng: currentLocation[1] })
    }, [currentLocation, orderTracking])
    useEffect(() => {
        navigator.geolocation.watchPosition((v) => { console.log(v); (orderStatus != 'on the way') ? setCurrentLocation([v.coords.latitude, v.coords.longitude]) : setCurrentLocation() })
        updateOrderLocation()


    }, [orderTracking, orderStatus])


    const Directions = () => {
        const map = useMap()
        const routesLibrary = useMapsLibrary('routes')
        const [directionsService, setDirectionsService] = useState()
        const [directionsRenderer, setDirectionsRenderer] = useState()
        const [routes, setRoutes] = useState([])
        const [routeIndex, setRouteIndex] = useState(0);
        const selected = routes[routeIndex];
        const leg = selected?.legs[0];





        useEffect(() => {
            if (!routesLibrary || !map) return;
            if (orderStatus == 'on the way' || orderTracking) {
                setDirectionsService(new routesLibrary.DirectionsService());
                setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
            }
        }, [routesLibrary, map, orderStatus, driverPrevLocation]);
        useEffect(() => {
            if (!directionsService || !directionsRenderer) return;
            directionsService
                .route({
                    origin: orderTracking ? position : (currentDriverLocation && orderStatus == 'on the way') ? currentDriverLocation : origin,
                    destination: destination,
                    travelMode: 'DRIVING',
                    provideRouteAlternatives: true,
                    avoidTolls: true,
                })
                .then(response => {
                    directionsRenderer.setDirections(response);
                    setRoutes(response.routes);
                });

            directionsRenderer.setOptions({ suppressMarkers: true })


            return () => directionsRenderer.setMap(null);
        }, [directionsService, directionsRenderer]);

    }

    return (
        <Card className={`mt-12 md:mt-20 rounded-3xl h-96  w-full overflow-hidden border-4 ${orderStatus == "ready" ? 'border-lime-400' : orderStatus == 'on the way' ? 'border-blue-400' : 'border-gray-400'} trans`}>
            <APIProvider apiKey={'AIzaSyDu0t5ZAFoF8oKGdoretlTZfmZ0XQXmgok'}>
                <Map
                    className='h-full w-full bg-black'
                    defaultCenter={{ lat: 40.7292082, lng: -74.2184576 }}
                    defaultZoom={12}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    styles={[
                        {
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#212121"
                                }
                            ]
                        },
                        {
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#757575"
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "color": "#212121"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#757575"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.country",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#9e9e9e"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.land_parcel",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.locality",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#bdbdbd"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#757575"
                                }
                            ]
                        },
                        {
                            "featureType": "poi.park",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#181818"
                                }
                            ]
                        },
                        {
                            "featureType": "poi.park",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#616161"
                                }
                            ]
                        },
                        {
                            "featureType": "poi.park",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "color": "#1b1b1b"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#2c2c2c"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#8a8a8a"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#373737"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#3c3c3c"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway.controlled_access",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#4e4e4e"
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#616161"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#757575"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "stylers": [
                                {
                                    "weight": 1
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "weight": 1
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#3d3d3d"
                                }
                            ]
                        }
                    ]}
                >
                    <Directions />
                    <Marker
                        position={{ ...originPosition }}
                        title={'Still The Dubb'}

                    />
                    {orderStatus == 'on the way' && <Marker
                        position={{ ...currentDriverLocation }}
                        title={'Driver'}

                    />}
                    <Marker
                        position={{ ...destinationPosition }}
                        title={'You'}

                    />
                </Map>

            </APIProvider>
        </Card>
    )
}

export default Maps