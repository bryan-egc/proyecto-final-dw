
import React from 'react';
import "./footer.css";
import "./footer.sass";

const footer = () => {
  return (
    <>
    <div class="footer-basic">
        <footer>
            <ul class="list-inline">
                <li class="list-inline-item">
                    <a href="#">
                    9490 19 3839<br/>
                    Bryan Ernesto Gámez Cipriano<br/>
                    bgamezc@miumg.edu.gt<br/>
                    </a>
                </li>

                <li class="list-inline-item">
                    <a href="#">
                    9490 20 10326<br/>
                    Helder Iván Ajcalón Jacobo<br/>
                    hajcalonj@miumg.edu.gt<br/>
                    </a>
                </li>
            </ul>

            <p class="copyright">Desarrollo Web Sección "A"</p>
        </footer>
    </div>

    </>
  );
}

export default footer