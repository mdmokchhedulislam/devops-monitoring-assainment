import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 50,           
    duration: '1m',    
};

export default function () {
    let res = http.get('http://18.209.45.45:8080/');  
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);  
}
