export default function progressBar(percent) {
    return <div
        style={{
            width: '100%',
            height: '12px',
            borderRadius: '999px',
            backgroundColor: '#d5d7dc',
            overflow: 'hidden'
        }}
    >
        <div
            style={{
                width: `${percent}%`,
                height: '100%',
                borderRadius: '999px',
                backgroundColor: '#1f5be6'
            }} />
    </div>;
}

