import { onUnmounted, onMounted, ref } from 'vue'

export function useGeolocation() {
    const coords = ref({ latitude: -33.95908009669137, longitude: 18.470931797112016 })

    const isSupported = 'navigator' in window && 'geolocation' in navigator

    let watcher = null

    onMounted(() => {
        console.log('useGeolocation')
        console.log(isSupported)
        if (isSupported) {

            navigator.geolocation.getCurrentPosition(
                (position) => { 
                    coords.value = position.coords
                    console.log(coords.value)
                }
            )

            watcher = navigator.geolocation.watchPosition(
                position => (coords.value = position.coords)
            )
        }
    })

    onUnmounted(() => {
        console.log('remove useGeolocation')
        if (watcher) navigator.geolocation.clearWatch(watcher)
    })

    return { coords, isSupported }
}