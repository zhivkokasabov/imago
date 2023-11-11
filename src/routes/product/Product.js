import React, { Fragment, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useQuery
} from 'react-query';

import { queryKey, get } from '../../queries/product';

import styles from './Product.module.scss';

import Image from '../../components/Image/Image';
import Spinner from '../../components/Spinner/Spinner';
import Divider from '../../components/Divider/Divider';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';

export default function Product() {
  let { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, id],
    queryFn: () => get(id)
  });

  const [selectedLicenseId, setSelectedLicenseId] = useState();
  const cheapestLicense = useMemo(() => data?.usagelicences.sort((a, b) => a.credits >= b.credits ? 1 : -1)[0], [data]);

  const onLicenseChange = (id) => {
    setSelectedLicenseId(id);
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.product}>
      <section>
        <h1>
          {data.title}
        </h1>
        <p>
          {data.caption}
        </p>
        <div className={styles['product__image-container']}>
          <Image src={data.mediathumb} alt={data.title} omitDomain loading="eager" />
        </div>
      </section>
      <aside>
        <h2 className={styles['product--large']}>
          Choose your License
        </h2>
        <div className={`${styles.info} ${styles['product--grey']}`}>
          <div className={styles.info__header}>
            <span className={styles['product--large']}>Premium RF</span>
            <div>
              <span className={styles['product__sub-text']}>{'from '}</span>
              <span data-testid="cheapestLicense" className={styles['product--large']}>{`${cheapestLicense.credits} Credits`}</span>
            </div>
          </div>
          <Divider variant="light" />
          <div className={styles.license__list}>
            {
              data.usagelicences.map((license, index) => (
                <Fragment key={license.licenseid}>
                  <label data-testid="licenseLabel" htmlFor={license.licenseid} className={styles.license}>
                    <input
                      type="radio"
                      name="license"
                      id={license.licenseid}
                      value={license.licenseid}
                      onChange={() => onLicenseChange(license.licenseid)}
                    />
                    <span className={styles.license__info}>
                      <span className={styles['license__name-container']}>
                        <Checkbox className={styles.license__checkbox} active={selectedLicenseId === license.licenseid} />
                        <span className={styles.license__name}>{license.name}</span>
                      </span>
                      <span>{`${license.credits} Credits`}</span>
                    </span>
                    <span className={styles['product__sub-text']}>{license.languagePointer}</span>
                  </label>
                  {
                    index < data.usagelicences.length - 1
                      ? (
                        <Divider className={styles.license__divider} variant="light" />
                      )
                      : (null)
                  }
                </Fragment>
              ))
            }
          </div>
        </div>
        <div className={styles.product__actions}>
          <Button variant="outlined">Add to Basket</Button>
          <Button variant="contained">Buy Now</Button>
        </div>
        <Divider className={styles.product__divider} />
        <dl>
          <dt>CREDIT</dt>
          <dd>{data.creator}</dd>
          <dt>IMAGE ID</dt>
          <dd>{data.mediaid}</dd>
          <dt>MAX SIZE</dt>
          <dd>{`${data.width}x${data.height} PIXELS`}</dd>
          <dt>DATE</dt>
          <dd>{new Date(data.creationDate).toLocaleDateString()}</dd>
          <dt>INFO</dt>
          <dd>{data.caption}</dd>
        </dl>
      </aside>
    </div>
  );
}
