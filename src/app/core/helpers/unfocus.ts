export function unfocus(): any {
  const tmp: HTMLInputElement = document.createElement('input');
  tmp.style.position = 'fixed';
  document.body.appendChild(tmp);
  tmp.focus();
  document.body.removeChild(tmp);
}
