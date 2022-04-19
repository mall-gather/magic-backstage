export default function removeArray(arr: Array<any>, removeElement: any) {
  let index = arr.indexOf(removeElement)
  if (index > -1) {
    arr.splice(index, 1)
  }
}