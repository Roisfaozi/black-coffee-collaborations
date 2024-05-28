package repository

import (
	"github.com/Roisfaozi/black-coffee-collaborations/config"
	report "github.com/Roisfaozi/black-coffee-collaborations/internal/models/dashboard"
	"github.com/jmoiron/sqlx"
)

type DashboardRepository interface {
	GetDashboardReport(interval string) (*config.Result, error)
}

type dashboardRepository struct {
	*sqlx.DB
}

func NewDashboardRepository(db *sqlx.DB) *dashboardRepository {
	return &dashboardRepository{
		db,
	}
}

func (r *dashboardRepository) GetDashboardReport(interval string) (*config.Result, error) {
	q :=
		`SELECT
			DATE_TRUNC(?, created_at) AS interval,
			SUM(total_price) AS total_price
		FROM
			cart_order
		GROUP BY
			interval
		ORDER BY
			interval DESC
		LIMIT 
			6`
	data := report.ReportDashboards{}

	if err := r.Select(&data, r.Rebind(q), interval); err != nil {
		return nil, err
	}

	return &config.Result{Data: data}, nil
}
