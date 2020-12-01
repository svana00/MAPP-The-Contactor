export default function contains(name, query) {
  if (name.includes(query)) {
    return true;
  }

  return false;
}
