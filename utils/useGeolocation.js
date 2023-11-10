import { onUnmounted, onMounted, ref } from 'vue'

export function useGeolocation() {
    const coords = ref({ latitude: -33.95908009669137, longitude: 18.470931797112016 })

    const isSupported = 'navigator' in window && 'geolocation' in navigator

    let watcher = null

    onMounted(() => {
        if (isSupported) {

            navigator.geolocation.getCurrentPosition(
                (position) => { 
                    coords.value = position.coords
                }
            )

            watcher = navigator.geolocation.watchPosition(
                position => (coords.value = position.coords)
            )
        }
    })

    onUnmounted(() => {
        if (watcher) navigator.geolocation.clearWatch(watcher)
    })

    return { coords, isSupported }
}