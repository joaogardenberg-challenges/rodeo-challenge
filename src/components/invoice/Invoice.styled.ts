import styled from 'styled-components'

export default styled.main`
  margin: 0 auto;
  max-width: 100%;
  padding: 1rem;
  width: 60rem;

  .page-header {
    padding: 1rem 1rem 2rem;
  }

  .page-title {
    display: flex;
    flex-direction: column;
    font-size: 2.5rem;
    word-break: break-all;
    text-align: center;

    .invoice-name {
      font-size: 0.8em;
    }
  }

  .phases {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 3rem 1rem;
  }

  .separator {
    border-bottom: 1px solid #666;
  }

  .cost-item {
    align-items: center;
    display: flex;
    gap: 1rem;
    padding: 0.5rem;
    transition: background-color 200ms ease-in-out;

    &--labels,
    &--subtotal,
    &--total {
      font-weight: 700;
    }

    &--subtotal {
      background-color: #f5f5f5;
    }

    &:not(:last-of-type) {
      border-bottom: 1px solid #ccc;
    }

    &:not(&--labels) {
      &:hover {
        background-color: #eee;

        &.cost-item--subtotal {
          background-color: #e5e5e5;
        }
      }

      .cost-item__tax,
      .cost-item__description,
      .cost-item__price {
        font-family: 'Roboto Mono', monospace;
        font-size: 0.9em;
      }
    }

    &__name {
      flex: 1;
      word-break: break-all;
    }

    &__tax,
    &__description,
    &__price {
      text-align: right;
    }

    &__tax {
      width: 2rem;
    }

    &__description {
      width: 12rem;
    }

    &__price {
      width: 8rem;
    }
  }
`
