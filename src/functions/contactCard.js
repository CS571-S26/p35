import vCardsJS from 'vcards-js';

export function contactCard(person = {}) {
    const vCard = vCardsJS();

    const [firstName = '', ...rest] = (person.name ?? '').trim().split(/\s+/);

    vCard.firstName = firstName || 'Contact';
    vCard.lastName = rest.join(' ');
    vCard.organization = person.office ?? '';
    vCard.workPhone = person.phone ?? '';
    vCard.title = person.role ?? '';
    vCard.email = person.email ?? '';
    vCard.note = `Office Hours: ${person.officeHours}` ?? '';

    const vcfText = vCard.getFormattedString();

    if (typeof window !== 'undefined') {
        const blob = new Blob([vcfText], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${person.name ?? 'contact'}.vcf`;
        link.click();
        URL.revokeObjectURL(url);
    }

    return vcfText;
}