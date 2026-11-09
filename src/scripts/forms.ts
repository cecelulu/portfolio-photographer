// Envoi des formulaires du site.
// - Si `data-endpoint` est renseigné : envoi en POST (FormData) puis redirection vers /merci.
// - Sinon : ouverture de la messagerie du visiteur avec la demande pré-remplie.

function collect(form: HTMLFormElement): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  const seen = new Set<string>();

  form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[name]').forEach((el) => {
    if (!el.name || el.name.startsWith('_') || seen.has(el.name)) return;
    if (el.closest('[hidden]')) return;
    seen.add(el.name);

    const label = el.dataset.label || el.closest('[data-label]')?.getAttribute('data-label') || el.name;
    let value = '';

    if (el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio')) {
      const checked = form.querySelectorAll<HTMLInputElement>(`[name="${el.name}"]:checked`);
      value = Array.from(checked)
        .map((c) => c.dataset.text || c.value)
        .join(', ');
    } else if (el instanceof HTMLSelectElement) {
      value = el.value ? el.options[el.selectedIndex].text.trim() : '';
    } else {
      value = el.value.trim();
    }
    if (value && el.name !== 'consentement') rows.push({ label, value });
  });
  return rows;
}

function toMailto(form: HTMLFormElement, rows: { label: string; value: string }[]) {
  const to = form.dataset.mailto || 'contact@sprint-racing.com';
  const subject = form.dataset.subject || 'Demande depuis le site';
  const body = rows.map((r) => `${r.label} : ${r.value}`).join('\n');
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + '\n')}`;
}

export function initForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-request-form]').forEach((form) => {
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Les champs des blocs masqués sont ignorés lors de la validation.
      const hiddenFields = form.querySelectorAll<HTMLInputElement>('[hidden] [name]');
      hiddenFields.forEach((el) => (el.disabled = true));
      const valid = form.reportValidity();
      hiddenFields.forEach((el) => (el.disabled = false));
      if (!valid) return;

      // Anti-spam : champ piège rempli = robot.
      const trap = form.querySelector<HTMLInputElement>('[name="_site_web"]');
      if (trap && trap.value) return;

      const rows = collect(form);
      const endpoint = form.dataset.endpoint;

      if (!endpoint) {
        window.location.href = toMailto(form, rows);
        if (status) {
          status.hidden = false;
          status.textContent =
            'Votre messagerie va s’ouvrir avec votre demande pré-remplie : il ne vous reste qu’à l’envoyer. Rien ne s’ouvre ? Écrivez-nous à contact@sprint-racing.com ou appelez le 01 30 66 63 60.';
        }
        return;
      }

      try {
        if (submit) {
          submit.disabled = true;
          submit.dataset.text = submit.textContent || '';
          submit.textContent = 'Envoi en cours…';
        }
        const data = new FormData();
        data.append('_subject', form.dataset.subject || 'Demande depuis le site');
        rows.forEach((r) => data.append(r.label, r.value));
        const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
        window.location.href = '/merci/';
      } catch {
        if (status) {
          status.hidden = false;
          status.classList.add('is-error');
          status.textContent =
            'Oups, l’envoi a échoué. Réessayez dans un instant ou contactez-nous au 01 30 66 63 60 / contact@sprint-racing.com.';
        }
        if (submit) {
          submit.disabled = false;
          submit.textContent = submit.dataset.text || 'Envoyer';
        }
      }
    });
  });
}
