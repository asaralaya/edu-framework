
type plugType = 'disc' | 'square' | 'hand' | 'arrow1' | 'arrow2' | 'arrow3';
type pathType = 'straight' | 'arc' | 'fluid' | 'magnet' | 'grid';

export interface LLOptions {
    startPlug?: plugType,
    startPlugColor?: string,
    startPlugSize?: Number,
    startPlugOutlineColor?: string,
    endPlug?: plugType,
    endPlugColor?: string,
    endPlugSize?: Number,
    endPlugOutlineColor?: string,
    color?: string,
    size?: number,
    path?: pathType,
    startSocket?: string,
    endSocket?: string,
    dash?: any
  };
  
export const defaultConfig: LLOptions = {
    startPlug: 'disc',
    startPlugColor: 'white',
    startPlugSize: 3,
    startPlugOutlineColor: '#515151',
    endPlug: 'arrow3',
    endPlugColor: 'white',
    endPlugSize: 3,
    endPlugOutlineColor: '#515151',
    color: '#515151',
    size: 1,
    path: 'grid',
    startSocket: 'right', endSocket: 'left',
    dash: {len: 6, gap: 3}
  }

export const headerLineConfig = {
       endPlugColor:'#b9b9b9',
       endPlugOutlineColor:'#b9b9b9',
       color:'#b9b9b9',
       startPlug: 'behind'
}