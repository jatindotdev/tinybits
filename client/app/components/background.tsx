export function Background() {
  return (
    <div style={styles.backgroundMain}>
      <div style={styles.backgroundMainBefore} />
      <div style={styles.backgroundMainAfter} />
      <div style={styles.backgroundContent} />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  backgroundMain: {
    width: '100%',
    minHeight: '100vh',
    position: 'fixed',
    zIndex: -1,
    display: 'flex',
    justifyContent: 'center',
    padding: '120px 24px 160px 24px',
    pointerEvents: 'none',
  },
  backgroundMainBefore: {
    background: 'radial-gradient(circle, rgba(2, 0, 36, 0) 0, #fafafa 100%)',
    position: 'absolute',
    content: '""',
    zIndex: 2,
    width: '100%',
    height: '100%',
    top: 0,
  },
  backgroundMainAfter: {
    content: '""',
    backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><path id='Path_3' data-name='Path 3' d='M96,95h4v1H96v4H95V96H86v4H85V96H76v4H75V96H66v4H65V96H56v4H55V96H46v4H45V96H36v4H35V96H26v4H25V96H16v4H15V96H0V95H15V86H0V85H15V76H0V75H15V66H0V65H15V56H0V55H15V46H0V45H15V36H0V35H15V26H0V25H15V16H0V15H15V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h4v1H96v9h4v1H96v9h4v1H96v9h4v1H96v9h4v1H96v9h4v1H96v9h4v1H96v9h4v1H96Zm-1,0V86H86v9ZM85,95V86H76v9ZM75,95V86H66v9ZM65,95V86H56v9ZM55,95V86H46v9ZM45,95V86H36v9ZM35,95V86H26v9ZM25,95V86H16v9ZM16,85h9V76H16Zm10,0h9V76H26Zm10,0h9V76H36Zm10,0h9V76H46Zm10,0h9V76H56Zm10,0h9V76H66Zm10,0h9V76H76Zm10,0h9V76H86Zm9-10V66H86v9ZM85,75V66H76v9ZM75,75V66H66v9ZM65,75V66H56v9ZM55,75V66H46v9ZM45,75V66H36v9ZM35,75V66H26v9ZM25,75V66H16v9ZM16,65h9V56H16Zm10,0h9V56H26Zm10,0h9V56H36Zm10,0h9V56H46Zm10,0h9V56H56Zm10,0h9V56H66Zm10,0h9V56H76Zm10,0h9V56H86Zm9-10V46H86v9ZM85,55V46H76v9ZM75,55V46H66v9ZM65,55V46H56v9ZM55,55V46H46v9ZM45,55V46H36v9ZM35,55V46H26v9ZM25,55V46H16v9ZM16,45h9V36H16Zm10,0h9V36H26Zm10,0h9V36H36Zm10,0h9V36H46Zm10,0h9V36H56Zm10,0h9V36H66Zm10,0h9V36H76Zm10,0h9V36H86Zm9-10V26H86v9ZM85,35V26H76v9ZM75,35V26H66v9ZM65,35V26H56v9ZM55,35V26H46v9ZM45,35V26H36v9ZM35,35V26H26v9ZM25,35V26H16v9ZM16,25h9V16H16Zm10,0h9V16H26Zm10,0h9V16H36Zm10,0h9V16H46Zm10,0h9V16H56Zm10,0h9V16H66Zm10,0h9V16H76Zm10,0h9V16H86Z' fill='rgba(255,255,255,0.1)' fill-rule='evenodd' opacity='0.5'/><path id='Path_4' data-name='Path 4' d='M6,5V0H5V5H0V6H5v94H6V6h94V5Z' fill='rgba(255,255,255,0.1)' fill-rule='evenodd'/></svg>")`,
    zIndex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    opacity: 0.4,
    filter: 'invert(1)',
  },
  backgroundContent: {
    zIndex: 3,
    width: '100%',
    maxWidth: '640px',
    backgroundImage: `radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 1) 0px, transparent 0%),
                      radial-gradient(at 97% 21%, hsla(50, 99%, 72%, 1) 0px, transparent 50%),
                      radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%),
                      radial-gradient(at 10% 29%, hsla(327, 96%, 67%, 1) 0px, transparent 50%),
                      radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%),
                      radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%),
                      radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 50%)`,
    position: 'absolute',
    height: '100%',
    filter: 'blur(100px) saturate(150%)',
    top: '80px',
    opacity: 0.15,
  },
};
